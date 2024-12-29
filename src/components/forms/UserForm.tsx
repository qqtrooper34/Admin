import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { getAuthServers } from '../../api/auth-servers';
import type { User } from '../../types/user';
import { USER_ROLES } from '../../types/user';

interface UserFormProps {
  onSubmit: (data: Partial<User>) => void;
  initialData?: Partial<User>;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: initialData,
  });

  const { data: authServers = [] } = useQuery({
    queryKey: ['authServers'],
    queryFn: getAuthServers,
  });

  const selectedServerId = watch('company_guid');

  const serverOptions = authServers.map(server => ({
    value: server.id,
    label: server.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Auth Server</label>
        <Select
          options={serverOptions}
          value={serverOptions.find(option => option.value === selectedServerId)}
          onChange={(option) => setValue('company_guid', option?.value || '')}
          className="mt-1"
          placeholder="Select Auth Server..."
        />
        {errors.company_guid && (
          <p className="mt-1 text-sm text-red-600">{errors.company_guid.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('login', { required: 'Email is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          {...register('phone', { required: 'Phone is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          {...register('role', { required: 'Role is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {Object.entries(USER_ROLES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {!initialData && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;