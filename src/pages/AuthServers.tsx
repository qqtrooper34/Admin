import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DataTable } from '../components/DataTable';
import { getAuthServers, updateAuthServerStatus, deleteAuthServer, createAuthServer, updateAuthServer } from '../api/auth-servers';
import type { AuthServer } from '../types';
import { Power, Trash2, Edit } from 'lucide-react';
import AuthServerForm from '../components/forms/AuthServerForm';
import EditAuthServerForm from '../components/forms/EditAuthServerForm';
import Modal from '../components/Modal';

const AuthServers = () => {
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingServer, setEditingServer] = useState<AuthServer | null>(null);

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

  const createMutation = useMutation({
    mutationFn: createAuthServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authServers'] });
      toast.success('Auth server created successfully');
      setShowCreateForm(false);
    },
    onError: () => {
      toast.error('Failed to create auth server');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AuthServer> }) =>
      updateAuthServer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authServers'] });
      toast.success('Auth server updated successfully');
      setEditingServer(null);
    },
    onError: () => {
      toast.error('Failed to update auth server');
    },
  });
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
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
    accessorKey: 'mini_backend_password',
    header: 'Backend Password',
  },
  {
    accessorKey: 'registration_password',
    header: 'Mobile Password',
  },
  {
    accessorKey: 'api_call_url',
    header: 'API URL',
  },
  {
    accessorKey: 'user_url',
    header: 'User URL',
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
      <div className="flex space-x-2">
        <button
          onClick={() => setEditingServer(row.original)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => deleteMutation.mutate(row.original.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
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
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Auth Server
          </button>
        </div>
      </div>

      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Add Auth Server"
      >
        <AuthServerForm onSubmit={createMutation.mutate} />
      </Modal>

      <Modal
        isOpen={!!editingServer}
        onClose={() => setEditingServer(null)}
        title="Edit Auth Server"
      >
        {editingServer && (
          <EditAuthServerForm
            initialData={editingServer}
            onSubmit={(data) => updateMutation.mutate({ id: editingServer.id, data })}
          />
        )}
      </Modal>

      <DataTable
        data={authServers}
        columns={columns}
        searchPlaceholder="Search auth servers..."
      />
    </div>
  );
};

export default AuthServers;