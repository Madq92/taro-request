import {UserCreateRequest, UserDTO, UserEditRequest, UserQueryRequest} from "@/api/interface/userInterface";
import api from "./baseApi";

namespace UserApi {
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
}

export default UserApi;



