import axios from 'axios';
import { useAuthServer } from '../contexts/AuthServerContext';

export interface Skill {
  pk: string;
  name: string;
  createtime?: string;
  lastedittime?: string;
}

export interface Group {
  pk: string;
  name: string;
  dispatcher_phone?: string;
}

export const useServerConfigApi = () => {
  const { selectedServer } = useAuthServer();
  const baseURL = selectedServer?.api_call_url;

  const getSkills = async () => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.get<Skill[]>(`${baseURL}/api/skills`);
    return response.data;
  };

  const createSkill = async (data: { name: string }) => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.post<Skill>(`${baseURL}/api/skills`, data);
    return response.data;
  };

  const updateSkill = async (id: string, data: { name: string }) => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.put<Skill>(`${baseURL}/api/skills/${id}`, data);
    return response.data;
  };

  const deleteSkill = async (id: string) => {
    if (!baseURL) throw new Error('No server selected');
    await axios.delete(`${baseURL}/api/skills/${id}`);
  };

  const getGroups = async () => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.get<Group[]>(`${baseURL}/api/groups`);
    return response.data;
  };

  const createGroup = async (data: { name: string; dispatcher_phone?: string }) => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.post<Group>(`${baseURL}/api/groups`, data);
    return response.data;
  };

  const deleteGroup = async (id: string) => {
    if (!baseURL) throw new Error('No server selected');
    await axios.delete(`${baseURL}/api/groups/${id}`);
  };

  return {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    getGroups,
    createGroup,
    deleteGroup,
  };
};