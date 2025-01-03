import React from 'react';
import { useForm } from 'react-hook-form';
import type { AuthServer } from '../../types';

interface EditAuthServerFormProps {
  onSubmit: (data: Partial<AuthServer>) => void;
  initialData: AuthServer;
}

const EditAuthServerForm: React.FC<EditAuthServerFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700">Backend IP</label>
        <input
          type="text"
          {...register('mini_backend_ip', { required: 'Backend IP is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Backend Port</label>
        <input
          type="number"
          {...register('mini_backend_port', { required: 'Port is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Backend Password</label>
        <input
          type="text"
          {...register('mini_backend_password')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Leave empty to keep current password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mobile Registration Password</label>
        <input
          type="text"
          {...register('registration_password')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Leave empty to keep current password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">API URL</label>
        <input
          type="text"
          {...register('api_call_url', { required: 'API URL is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">User URL</label>
        <input
          type="text"
          {...register('user_url', { required: 'User URL is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Server
      </button>
    </form>
  );
};

export default EditAuthServerForm;