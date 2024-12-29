import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import type { Configuration } from '../../types';
import { PAYMENT_SYSTEM_OPTIONS, MAP_PROVIDER_OPTIONS } from '../../constants/configuration';

interface ConfigurationFormProps {
  onSubmit: (data: Partial<Configuration>) => void;
  initialData?: Configuration;
  serverId: string;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  onSubmit,
  initialData,
  serverId,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...initialData,
      company_guid: serverId,
    },
  });

  const paySystem = watch('pay_system');
  const mapType = watch('map_type');
  const naviType = watch('navi_type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          
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
        </div>

        {/* Task Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Task Settings</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('one_work_task')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">One Work Task</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('ext_barcode_scanner')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">External Barcode Scanner</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('task_redoing')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Task Redoing</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('disable_reordering')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Disable Reordering</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('allow_undo')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Allow Undo</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('risk_late')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Risk Late</label>
            </div>
          </div>
        </div>

        {/* Payment System */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Payment System</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Provider</label>
            <Select
              value={PAYMENT_SYSTEM_OPTIONS.find(opt => opt.value === paySystem)}
              onChange={(option) => setValue('pay_system', option?.value)}
              options={PAYMENT_SYSTEM_OPTIONS}
              className="mt-1"
            />
          </div>
        </div>

        {/* Maps Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Maps Configuration</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Map Provider</label>
              <Select
                value={MAP_PROVIDER_OPTIONS.find(opt => opt.value === mapType)}
                onChange={(option) => setValue('map_type', option?.value)}
                options={MAP_PROVIDER_OPTIONS}
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Navigation Provider</label>
              <Select
                value={MAP_PROVIDER_OPTIONS.find(opt => opt.value === naviType)}
                onChange={(option) => setValue('navi_type', option?.value)}
                options={MAP_PROVIDER_OPTIONS}
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Map API Key</label>
              <input
                type="text"
                {...register('map_key')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Navigation API Key</label>
              <input
                type="text"
                {...register('navi_key')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Autopilot Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Autopilot Settings</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('autopilot_enable')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Enable Autopilot</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Radius (meters)</label>
              <input
                type="number"
                {...register('autopilot_radius')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time (seconds)</label>
              <input
                type="number"
                {...register('autopilot_time')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Frequency Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Frequency Settings</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Send Frequency</label>
              <input
                type="number"
                {...register('freqsend')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">GPS Frequency</label>
              <input
                type="number"
                {...register('freqgps')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Get Frequency</label>
              <input
                type="number"
                {...register('freqget')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Debug Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Debug Settings</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('enable_logs')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">Enable Logs</label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update Configuration' : 'Create Configuration'}
      </button>
    </form>
  );
};

export default ConfigurationForm;