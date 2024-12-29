import axios from 'axios';
import type { Agent } from '../types';
import { useAuthServer } from '../contexts/AuthServerContext';

export const useAgentsApi = () => {
  const { selectedServer } = useAuthServer();
  const baseURL = selectedServer?.api_call_url;

  const getAgents = async () => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.get<Agent[]>(`${baseURL}/api/agents`);
    return response.data;
  };

  const createAgent = async (data: Partial<Agent>) => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.post<Agent>(`${baseURL}/api/agents`, data);
    return response.data;
  };

  const updateAgent = async (pk: string, data: Partial<Agent>) => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.put<Agent>(`${baseURL}/api/agents/${pk}`, data);
    return response.data;
  };

  const deleteAgent = async (pk: string) => {
    if (!baseURL) throw new Error('No server selected');
    await axios.delete(`${baseURL}/api/agents/${pk}`);
  };

  return {
    getAgents,
    createAgent,
    updateAgent,
    deleteAgent
  };
};