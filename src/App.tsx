import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthServerProvider } from './contexts/AuthServerContext';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import AuthServers from './pages/AuthServers';
import UsersList from './pages/Users/UsersList';
import ConfigurationsList from './pages/Configurations/ConfigurationsList';
import TemplatesList from './pages/Templates/TemplatesList';
import ImportsList from './pages/Imports/ImportsList';
import AgentsList from './pages/Agents/AgentsList';
import RoutesList from './pages/Routes/RoutesList';
import DevicesList from './pages/Devices/DevicesList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthServerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="auth-servers" element={<AuthServers />} />
              <Route path="users" element={<UsersList />} />
              <Route path="agents" element={<AgentsList />} />
              <Route path="routes" element={<RoutesList />} />
              <Route path="devices" element={<DevicesList />} />
              <Route path="configurations" element={<ConfigurationsList />} />
              <Route path="templates" element={<TemplatesList />} />
              <Route path="imports" element={<ImportsList />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </Router>
      </AuthServerProvider>
    </QueryClientProvider>
  );
}

export default App;