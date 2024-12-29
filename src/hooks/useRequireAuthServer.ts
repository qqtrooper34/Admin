import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthServer } from '../contexts/AuthServerContext';

export function useRequireAuthServer() {
  const { selectedServer } = useAuthServer();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!selectedServer && location.pathname !== '/dashboard/auth-servers') {
      toast.warning('Please select an Auth Server first');
      navigate('/dashboard/auth-servers');
    }
  }, [selectedServer, navigate, location]);

  return selectedServer;
}