import { LoginResponse } from '../types/auth';

export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

export const handleRoleBasedRedirect = (loginResponse: LoginResponse) => {
  const { role, user_url, token } = loginResponse;
  
  // Store the token
  setAuthToken(token);
  
  switch (role) {
    case 1: // SuperAdmin
      window.location.href = '/dashboard';
      break;
    case 2: // Manager
      window.location.href = user_url;
      break;
    case 3: // Logist
      window.location.href = `${user_url}/plan`;
      break;
    case 4: // Dispatcher
      window.location.href = `${user_url}/fact`;
      break;
    case 5: // ClientAdmin
      window.location.href = user_url;
      break;
    default:
      window.location.href = '/';
  }
};