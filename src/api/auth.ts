import { api } from './api-client';
import type { LoginResponse, LoginCredentials, ResetPasswordRequest, UpdatePasswordRequest } from '../types/auth';

export const login = (credentials: LoginCredentials) =>
  api.post<LoginResponse>('/auth/login', credentials).then(res => res.data);

export const resetPassword = (data: ResetPasswordRequest) =>
  api.post('/auth/reset-password', data).then(res => res.data);

export const updatePassword = (data: UpdatePasswordRequest) =>
  api.post('/auth/update-password', data).then(res => res.data);