import React from 'react';
import { useForm } from 'react-hook-form';
import type { Import } from '../../types';

interface ImportFormProps {
  onSubmit: (data: Partial<Import>) => void;
  initialData?: Partial<Import>;
  companyGuid: string;
}

const ImportForm: React.FC<ImportFormProps> = ({
  onSubmit,
  initialData,
  companyGuid,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { ...initialData, company_guid: companyGuid },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          {...register('comment')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Configuration
        </label>
        <textarea
          {...register('config')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          placeholder="Enter JSON configuration"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Import
      </button>
    </form>
  );
};

export default ImportForm;
