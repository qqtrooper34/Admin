import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { getConfigurations } from '../api';
import type { Configuration } from '../types';

const Configurations = () => {
  const { data: configurations = [], isLoading } = useQuery({
    queryKey: ['configurations'],
    queryFn: getConfigurations,
  });

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'company_guid',
      header: 'Company ID',
    },
    {
      accessorKey: 'dispatcher_phone',
      header: 'Dispatcher Phone',
    },
    {
      accessorKey: 'version',
      header: 'Version',
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Configurations</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage system configurations and settings
          </p>
        </div>
      </div>
      <DataTable
        data={configurations}
        columns={columns}
        searchPlaceholder="Search configurations..."
      />
    </div>
  );
};

export default Configurations;