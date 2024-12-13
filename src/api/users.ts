import { api } from './api-client';
import type { User } from '../types/user';

export const getUsers = () => api.get<User[]>('/users').then(res => res.data);

export const createUser = (data: Omit<User, 'guid' | 'created_at' | 'updated_at'>) => 
  api.post<User>('/users', data).then(res => res.data);

export const updateUser = (id: string, data: Partial<User>) => 
  api.put<User>(`/users/${id}`, data).then(res => res.data);

export const deleteUser = (id: string) => 
  api.delete(`/users/${id}`).then(res => res.data);