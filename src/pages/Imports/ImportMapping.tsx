import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthServer } from '../../contexts/AuthServerContext';
import type { Template } from '../../types';

interface ImportMappingProps {
  templateId: string;
  value: Record<string, string>;
  onChange: (mapping: Record<string, string>) => void;
}

export default function ImportMapping({ templateId, value, onChange }: ImportMappingProps) {
  const { selectedServer } = useAuthServer();

  const { data: template } = useQuery<Template>({
    queryKey: ['template', templateId],
    enabled: !!templateId,
  });

  const fields = template?.data?.fields ? JSON.parse(template.data.fields) : [];

  const handleMappingChange = (fieldId: string, dbField: string) => {
    onChange({
      ...value,
      [fieldId]: dbField,
    });
  };

  const databaseFields = [
    { value: 'name', label: 'Name' },
    { value: 'code', label: 'Code' },
    { value: 'address', label: 'Address' },
    { value: 'phone', label: 'Phone' },
    { value: 'email', label: 'Email' },
    { value: 'comment', label: 'Comment' },
    { value: 'weight', label: 'Weight' },
    { value: 'volume', label: 'Volume' },
    { value: 'cost', label: 'Cost' },
    { value: 'priority', label: 'Priority' },
    { value: 'time_start', label: 'Start Time' },
    { value: 'time_end', label: 'End Time' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Field Mapping</h3>
      <p className="text-sm text-gray-500">
        Map template fields to database columns for import
      </p>

      <div className="mt-4 space-y-4">
        {fields.map((field: any) => (
          <div key={field.Guid} className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {field.Sign}
              </label>
              <p className="text-xs text-gray-500">Template Field</p>
            </div>
            <div>
              <select
                value={value[field.Guid] || ''}
                onChange={(e) => handleMappingChange(field.Guid, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select database field</option>
                {databaseFields.map((dbField) => (
                  <option key={dbField.value} value={dbField.value}>
                    {dbField.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}