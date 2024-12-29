import React from 'react';
import { Link, useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Server, Settings, FileText, Download, Users, Truck, Route, Smartphone, LogOut } from 'lucide-react';
import { ServerSelector } from './ServerSelector';
import { getAuthToken, removeAuthToken } from '../utils/auth';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    removeAuthToken();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Auth Servers', href: '/dashboard/auth-servers', icon: Server },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Agents', href: '/dashboard/agents', icon: Truck },
    { name: 'Devices', href: '/dashboard/devices', icon: Smartphone },
    { name: 'Routes', href: '/dashboard/routes', icon: Route },
    { name: 'Configurations', href: '/dashboard/configurations', icon: Settings },
    { name: 'Templates', href: '/dashboard/templates', icon: FileText },
    { name: 'Imports', href: '/dashboard/imports', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Server className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="hidden sm:flex sm:space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        location.pathname === item.href
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ServerSelector />
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;