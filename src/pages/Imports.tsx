import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { getImportsByCompany } from '../api';
import type { Import } from '../types';

const Imports = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const { data: imports = [], isLoading } = useQuery({
    queryKey: ['imports', selectedCompany],
    queryFn: () => selectedCompany ? getImportsByCompany(selectedCompany) : [],
    enabled: !!selectedCompany,
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
      accessorKey: 'comment',
      header: 'Comment',
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Imports</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage data imports and related tasks
          </p>
        </div>
      </div>
      <DataTable
        data={imports}
        columns={columns}
        searchPlaceholder="Search imports..."
      />
    </div>
  );
};

export default Imports;