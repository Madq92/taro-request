import Taro from "@tarojs/taro";
import qs from 'query-string'

const baseUrlPrefix = process.env.BASE_URL_PREFIX
const env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
console.log('编译环境：', env, baseUrlPrefix)

// 后端返回的结构体
interface CommonResult<T> {
  data: T,
  success: boolean,
  errorCode: string,
  errorDesc: string,
}

const TOKEN_KEY = "TOKEN_KEY"
const TOKEN_VALUE = "TOKEN_VALUE"

const api = {
  baseUrl: baseUrlPrefix,

  changeBaseUrl(url: string) {
    this.baseUrl = url;
  },

  async baseOptions(params, method = "GET") {
    let {url, data} = params
    const header = {}

    // header设置
    // -- 设置token
    const tokenKey = Taro.getStorageSync(TOKEN_KEY)
    const tokenValue = Taro.getStorageSync(TOKEN_VALUE)
    if (tokenKey && tokenValue) {
      header[tokenKey] = tokenValue
    }

    // -- 设置contentType
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    header['content-type'] = contentType

    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: baseUrlPrefix + url,
      data: data,
      method: method,
      header: header,
    }
    const result = await Taro.request(option as Taro.request.Option).catch((err) => {
      console.error("Taro request error:", err)
      Taro.showToast({title: "请求服务器失败，请稍后重试!", duration: 3000, icon: "error"})
    })
    if (!result) {
      return;
    }
    if (result.statusCode === 200) {
      return result.data.data
    } else if (result.statusCode == 401) {
      // 清除Token
      Taro.removeStorageSync(TOKEN_KEY)
      Taro.removeStorageSync(TOKEN_VALUE)
      console.error('未登录')
    } else {
      console.error("Request error", result.data)
      const resData = result.data as CommonResult<any>
      Taro.showToast({title: resData.errorDesc, duration: 3000, icon: "error"})
    }
  },

  get(url, data = {}) {
    let params
    if (data) {
      const query = qs.stringify(data)
      params = {url: url + '?' + query}
    } else {
      params = {url}
    }
    return this.baseOptions(params)
  },
  post(url, data = {}) {
    let params = {url, data}
    return this.baseOptions(params, 'POST')
  },

  put(url, data) {
    let params = {url, data}
    return this.baseOptions(params, 'PUT')
  },

  delete(url) {
    let params = {url}
    return this.baseOptions(params, 'DELETE')
  },
}

export default api
