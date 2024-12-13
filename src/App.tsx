import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AuthServers from './pages/AuthServers';
import UsersList from './pages/Users/UsersList';
import Configurations from './pages/Configurations';
import Templates from './pages/Templates';
import Imports from './pages/Imports';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth-servers" element={<AuthServers />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/configurations" element={<Configurations />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/imports" element={<Imports />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;