import { api } from './api-client';
import type { AuthServer } from '../types';

export const getAuthServers = () => 
  api.get<AuthServer[]>('/auth-servers').then(res => res.data);

export const createAuthServer = (data: Partial<AuthServer>) => 
  api.post<AuthServer>('/auth-servers', data).then(res => res.data);

export const updateAuthServer = (id: string, data: Partial<AuthServer>) => 
  api.put<AuthServer>(`/auth-servers/${id}`, data).then(res => res.data);

export const updateAuthServerStatus = (id: string, status: boolean) => 
  api.patch<AuthServer>(`/auth-servers/${id}/status`, { is_active: status }).then(res => res.data);

export const deleteAuthServer = (id: string) => 
  api.delete(`/auth-servers/${id}`).then(res => res.data);