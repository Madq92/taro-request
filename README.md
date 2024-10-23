# Taro request 封装

## quick start

1. 安装 query-string
```shell
pnpm install query-string
```
2. copy 项目中的 /src/api/baseApi.ts
3. 定义自己的业务APi

## example

以 "user" 的增删改查为例

```ts
// 首先定义 "UserDTO" 
export interface UserDTO {
  userId?: string;
  userName?: string;
  gender?: number;
  status?: string;
}

export interface UserEditRequest {
  user: UserDTO;
}

export interface UserCreateRequest {
  user: UserDTO;
}

export interface UserIdRequest {
  userId: string;
}

export interface UserQueryRequest {
  status?: string;
  nameLike?: string;
  gender?: number;
}

// 定义API
export function list(request: UserQueryRequest): Promise<UserDTO[]> {
  return api.get('user', request)
}

export function getById(userId: string): Promise<UserDTO> {
  return api.get(`user/${userId}`)
}

export function create(request: UserCreateRequest): Promise<boolean> {
  return api.post('user', request)
}

export function edit(request: UserEditRequest): Promise<boolean> {
  return api.put(`user/${request.user.userId}`, request)
}

export function deleteUser(userId: string): Promise<boolean> {
  return api.delete(`user/${userId}`)
}

// 使用
const user = await getById(userId)
const editSuccess = await edit({user})
await delSuccess = deleteUser(userId)

```


