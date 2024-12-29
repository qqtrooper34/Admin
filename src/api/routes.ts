import axios from 'axios';
import type { Route } from '../types';
import { useAuthServer } from '../contexts/AuthServerContext';

export const useRoutesApi = () => {
  const { selectedServer } = useAuthServer();
  const baseURL = selectedServer?.api_call_url;

  const getRoutes = async (params?: { page?: number; pageSize?: number; date?: string }) => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.get<Route[]>(`${baseURL}/api/routes`, { params });
    return response.data;
  };

  return {
    getRoutes
  };
};