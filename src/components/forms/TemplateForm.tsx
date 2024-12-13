import React from 'react';
import { useForm } from 'react-hook-form';
import type { Template } from '../../types';

interface TemplateFormProps {
  onSubmit: (data: Partial<Template>) => void;
  initialData?: Partial<Template>;
  companyGuid: string;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ onSubmit, initialData, companyGuid }) => {
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
        <label className="block text-sm font-medium text-gray-700">Task Buttons</label>
        <textarea
          {...register('task_buttons')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          placeholder="Enter JSON data"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Extra Task Buttons</label>
        <textarea
          {...register('task_buttons_extra')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          placeholder="Enter JSON data"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Template
      </button>
    </form>
  );
};

export default TemplateForm;