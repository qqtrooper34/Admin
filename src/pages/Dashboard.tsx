import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Server, Settings, FileText, Download, Users } from 'lucide-react';
import { getUsers } from '../api/users';
import { getAuthServers } from '../api';

const Dashboard = () => {
  const navigate = useNavigate();
 const { data: users = [] } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
});

const { data: authServers = [] } = useQuery({
  queryKey: ['authServers'],
  queryFn: getAuthServers,
});

  const cards = [
    {
      title: 'Auth Servers',
      description: `${authServers.length} servers configured`,
      icon: Server,
      href: '/auth-servers',
      color: 'bg-blue-500',
    },
    {
      title: 'Users',
      description: `${users.length} active users`,
      icon: Users,
      href: '/users',
      color: 'bg-green-500',
    },
    {
      title: 'Templates',
      description: 'Manage templates for various purposes',
      icon: FileText,
      href: '/templates',
      color: 'bg-purple-500',
    },
    {
      title: 'Imports',
      description: 'Handle data imports and related tasks',
      icon: Download,
      href: '/imports',
      color: 'bg-orange-500',
    },
  ];

  const recentUsers = users.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
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
              <p className="mt-2 text-sm text-gray-500">{card.description}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Users</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <li key={user.guid} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
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