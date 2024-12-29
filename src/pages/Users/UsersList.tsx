import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DataTable } from '../../components/DataTable';
import { getUsers, deleteUser, updateUser, createUser } from '../../api/users';
import { getAuthServers } from '../../api/auth-servers'; // Add this import
import { USER_ROLES } from '../../types/user';
import { Power, Trash2, UserPlus, Edit } from 'lucide-react';
import UserForm from '../../components/forms/UserForm';
import { Modal } from '../../components/Modal';


const UsersList = () => {
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
      setShowCreateForm(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateUser(id, { is_active: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User status updated successfully');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
      setEditingUser(null);
    },
  });


const { data: authServers = [] } = useQuery({
  queryKey: ['authServers'],
  queryFn: getAuthServers,
});

// Create a map for quick server lookups
const serverMap = useMemo(() => {
  return authServers.reduce((acc, server) => {
    acc[server.id] = server.name;
    return acc;
  }, {} as Record<string, string>);
}, [authServers]);

// Update the columns array
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'company_guid',
    header: 'Auth Server',
    cell: ({ row }) => serverMap[row.original.company_guid] || 'Unknown Server',
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
          onClick={() =>
            updateStatusMutation.mutate({
              id: row.original.id,
              status: !row.original.is_active,
            })
          }
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
      accessorKey: 'created_at',
      header: 'Создание',
    },
    {
      accessorKey: 'updated_at',
      header: 'Обновление',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setEditingUser(row.original)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteMutation.mutate(row.original.guid)}
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
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage system users and their permissions
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Add User"
      >
        <UserForm
          onSubmit={(data) => {
            createMutation.mutate(data);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User"
      >
        {editingUser && (
          <UserForm
            initialData={editingUser}
            onSubmit={(data) => updateMutation.mutate({ id: editingUser.id, data })}
          />
        )}
      </Modal>

      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
      />
    </div>
  );
};

export default UsersList;
