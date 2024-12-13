import React from 'react';
import { useForm } from 'react-hook-form';
import type { Configuration } from '../../types';

interface ConfigurationFormProps {
  onSubmit: (data: Partial<Configuration>) => void;
  initialData?: Partial<Configuration>;
  companyGuid: string;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ onSubmit, initialData, companyGuid }) => {
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
        <label className="block text-sm font-medium text-gray-700">Dispatcher Phone</label>
        <input
          type="tel"
          {...register('dispatcher_phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">One Work Task</label>
          <input
            type="checkbox"
            {...register('one_work_task')}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">External Barcode Scanner</label>
          <input
            type="checkbox"
            {...register('ext_barcode_scanner')}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Configuration
      </button>
    </form>
  );
};

export default ConfigurationForm;