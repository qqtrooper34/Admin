export interface LoginResponse {
  user_guid: string;
  role: number;
  user_url: string;
  token: string;
}

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}