import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Server, Settings, FileText, Download, Users, Truck, Route, Smartphone } from 'lucide-react';
import { getUsers } from '../api/users';
import { getAuthServers } from '../api';
import { useAgentsApi } from '../api/agents';
import { useRoutesApi } from '../api/routes';
import { useDevicesApi } from '../api/devices';
import { useAuthServer } from '../contexts/AuthServerContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const selectedServer = useAuthServer();
  const agentsApi = useAgentsApi();
  const routesApi = useRoutesApi();
  const devicesApi = useDevicesApi();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const { data: authServers = [] } = useQuery({
    queryKey: ['authServers'],
    queryFn: getAuthServers,
  });

  const { data: agents = [] } = useQuery({
    queryKey: ['agents', selectedServer?.selectedServer?.id],
    queryFn: agentsApi.getAgents,
    enabled: !!selectedServer?.selectedServer,
  });

  const { data: routes = [] } = useQuery({
    queryKey: ['routes', selectedServer?.selectedServer?.id],
    queryFn: () => routesApi.getRoutes(),
    enabled: !!selectedServer?.selectedServer,
  });

  const { data: devices = [] } = useQuery({
    queryKey: ['devices', selectedServer?.selectedServer?.id],
    queryFn: devicesApi.getDevices,
    enabled: !!selectedServer?.selectedServer,
  });

  const mainCards = [
    {
      title: 'Auth Servers',
      description: `${authServers.length} servers configured`,
      icon: Server,
      href: '/dashboard/auth-servers',
      color: 'bg-blue-500',
      stats: [
        { label: 'Active', value: authServers.filter(s => s.is_active).length },
        { label: 'Total', value: authServers.length }
      ]
    },
    {
      title: 'Users',
      description: `${users.length} registered users`,
      icon: Users,
      href: '/dashboard/users',
      color: 'bg-green-500',
      stats: [
        { label: 'Active', value: users.filter(u => u.is_active).length },
        { label: 'Total', value: users.length }
      ]
    },
    {
      title: 'Agents',
      description: `${agents.length} delivery agents`,
      icon: Truck,
      href: '/dashboard/agents',
      color: 'bg-purple-500',
      stats: [
        { label: 'Active', value: agents.filter(a => a.is_active).length },
        { label: 'Total', value: agents.length }
      ]
    },
    {
      title: 'Routes',
      description: 'Active delivery routes',
      icon: Route,
      href: '/dashboard/routes',
      color: 'bg-yellow-500',
      stats: [
        { label: 'Today', value: routes.length },
        { label: 'Completed', value: routes.filter(r => r.end_time).length }
      ]
    }
  ];

  const secondaryCards = [
    {
      title: 'Devices',
      description: `${devices.length} connected devices`,
      icon: Smartphone,
      href: '/dashboard/devices',
      color: 'bg-pink-500',
    },
    {
      title: 'Configurations',
      description: 'System configurations',
      icon: Settings,
      href: '/dashboard/configurations',
      color: 'bg-indigo-500',
    },
    {
      title: 'Templates',
      description: 'Document templates',
      icon: FileText,
      href: '/dashboard/templates',
      color: 'bg-teal-500',
    },
    {
      title: 'Imports',
      description: 'Data import tools',
      icon: Download,
      href: '/dashboard/imports',
      color: 'bg-orange-500',
    }
  ];

  const recentUsers = users.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of your delivery management system
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mainCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => navigate(card.href)}
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${card.color} text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{card.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{card.description}</p>
              {card.stats && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {card.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {secondaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => navigate(card.href)}
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${card.color} text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{card.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{card.description}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Users</h3>
          <p className="mt-1 text-sm text-gray-500">Latest user activity</p>
        </div>
        <div>
          <ul className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <li key={user.guid} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.login}</div>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;