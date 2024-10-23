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

export interface UserQueryRequest {
  status?: string;
  nameLike?: string;
  gender?: number;
}

