import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DataTable } from '../components/DataTable';
import { getAuthServers, updateAuthServerStatus, deleteAuthServer } from '../api';
import type { AuthServer } from '../types';
import { Power, Trash2 } from 'lucide-react';

const AuthServers = () => {
  const queryClient = useQueryClient();
  const { data: authServers = [], isLoading } = useQuery({
    queryKey: ['authServers'],
    queryFn: getAuthServers,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => 
      updateAuthServerStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authServers'] });
      toast.success('Status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAuthServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authServers'] });
      toast.success('Auth server deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete auth server');
    },
  });

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'mini_backend_ip',
      header: 'Backend IP',
    },
    {
      accessorKey: 'mini_backend_port',
      header: 'Port',
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <button
          onClick={() => updateStatusMutation.mutate({
            id: row.original.id,
            status: !row.original.is_active
          })}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            row.original.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <Power className="w-4 h-4 mr-1" />
          {row.original.is_active ? 'Active' : 'Inactive'}
        </button>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button
          onClick={() => deleteMutation.mutate(row.original.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Auth Servers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage authentication servers and their configurations
          </p>
        </div>
      </div>
      <DataTable
        data={authServers}
        columns={columns}
        searchPlaceholder="Search auth servers..."
      />
    </div>
  );
};

export default AuthServers;