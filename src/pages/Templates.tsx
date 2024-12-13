import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { getTemplatesByCompany } from '../api';
import type { Template } from '../types';

const Templates = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates', selectedCompany],
    queryFn: () => selectedCompany ? getTemplatesByCompany(selectedCompany) : [],
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
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage templates for various purposes
          </p>
        </div>
      </div>
      <DataTable
        data={templates}
        columns={columns}
        searchPlaceholder="Search templates..."
      />
    </div>
  );
};

export default Templates;