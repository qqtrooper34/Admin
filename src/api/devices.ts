import axios from 'axios';
import { useAuthServer } from '../contexts/AuthServerContext';

export interface Device {
  gid: string;
  time_reg: string;
  battery: number;
  mem_free: number;
  dev_last_packet: string;
  mob_oper_name: string;
  system_version: string;
  is_active: boolean;
  lastedittime: string;
  createtime: string;
  optimizationenabled: boolean;
  backgroundworkenabled: boolean;
  system_name: string;
  model_name: string;
  pk_agent: string;
  app_version: string;
}

export const useDevicesApi = () => {
  const { selectedServer } = useAuthServer();
  const baseURL = selectedServer?.api_call_url;

  const getDevices = async () => {
    if (!baseURL) throw new Error('No server selected');
    const response = await axios.get<Device[]>(`${baseURL}/api/devices`);
    return response.data;
  };

  return {
    getDevices
  };
};