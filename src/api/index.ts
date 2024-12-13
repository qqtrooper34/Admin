import axios from 'axios';

const API_URL = 'http://185.155.18.145:9999';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '53c2c87f-e6be-4e56-8769-afdff1712ac7', // Replace with actual API key
  },
});

// Auth Servers
export const getAuthServers = () => api.get('/auth-servers').then(res => res.data);
export const createAuthServer = (data: any) => api.post('/auth-servers', data).then(res => res.data);
export const updateAuthServerStatus = (id: string, status: boolean) => 
  api.patch(`/auth-servers/${id}/status`, { is_active: status }).then(res => res.data);
export const deleteAuthServer = (id: string) => api.delete(`/auth-servers/${id}`).then(res => res.data);

// Configurations
export const getConfigurations = () => api.get('/configurations').then(res => res.data);
export const createConfiguration = (data: any) => api.post('/configurations', data).then(res => res.data);
export const updateConfiguration = (id: string, data: any) => 
  api.put(`/configurations/${id}`, data).then(res => res.data);
export const deleteConfiguration = (id: string) => api.delete(`/configurations/${id}`).then(res => res.data);

// Templates
export const getTemplatesByCompany = (companyGuid: string) => 
  api.get(`/templates/${companyGuid}`).then(res => res.data);
export const createTemplate = (data: any) => api.post('/templates', data).then(res => res.data);
export const updateTemplate = (id: string, data: any) => 
  api.put(`/templates/${id}`, data).then(res => res.data);
export const deleteTemplate = (id: string) => api.delete(`/templates/${id}`).then(res => res.data);

// Imports
export const getImportsByCompany = (companyGuid: string) => 
  api.get(`/imports/${companyGuid}`).then(res => res.data);
export const createImport = (data: any) => api.post('/imports', data).then(res => res.data);
export const updateImport = (id: string, data: any) => 
  api.put(`/imports/${id}`, data).then(res => res.data);
export const deleteImport = (id: string) => api.delete(`/imports/${id}`).then(res => res.data);