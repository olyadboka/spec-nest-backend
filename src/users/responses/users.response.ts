export class UserResponse {
  id?: string;
  username?: string;
  email?: string;
}

export interface UserApiResponse {
  success: boolean;
  data: UserResponse | UserResponse[];
  message?: string;
}
