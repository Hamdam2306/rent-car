import api from "./api";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  phoneNumber: string;
}

export interface RegisterResponse {
  isSuccess: boolean;
  data: string;
  errors: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  data: {
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
    permissions: string[];
  };
  errors: string[];
}

export const authService = {
  register: (data: RegisterRequest) =>
    api.post<RegisterResponse>("/api/Auth/register", data),
  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/api/Auth/login", data),
};
