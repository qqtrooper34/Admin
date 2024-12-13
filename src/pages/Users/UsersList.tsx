import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DataTable } from '../../components/DataTable';
import { getUsers, deleteUser, updateUser } from '../../api/users';
import { USER_ROLES } from '../../types/user';
import { Power, Trash2, UserPlus } from 'lucide-react';

const UsersList = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => 
      updateUser(id, { is_active: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update user status');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'login',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => USER_ROLES[row.original.role as keyof typeof USER_ROLES],
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <button
          onClick={() => updateStatusMutation.mutate({
            id: row.original.guid,
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
          onClick={() => deleteMutation.mutate(row.original.guid)}
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
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage system users and their permissions
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>
      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
      />
    </div>
  );
};

export default UsersList;