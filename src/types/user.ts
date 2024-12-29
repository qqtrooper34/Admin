export interface User {
  guid: string;
  company_guid: string;
  phone: string;
  login: string;
  name: string;
  role: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const USER_ROLES = {
  1: 'SuperAdmin',
  2: 'Manager',
  3: 'Logist',
  4: 'Dispatcher',
  5: 'ClientAdmin'
} as const;