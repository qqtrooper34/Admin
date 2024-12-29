import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import type { Import, Template } from '../../types';
import ImportMapping from './ImportMapping';

interface ImportFormProps {
  onSubmit: (data: Partial<Import>) => void;
  initialData?: Import;
  serverId: string;
}

export default function ImportForm({ onSubmit, initialData, serverId }: ImportFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...initialData,
      company_guid: serverId,
    },
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ['templates', serverId],
    enabled: !!serverId,
  });

  const templateOptions = templates.map(template => ({
    value: template.guid,
    label: template.name,
  }));

  const handleFormSubmit = (formData: any) => {
    const data = {
      ...formData,
      config: {
        templateId: selectedTemplate,
        fieldMapping,
      },
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Template</label>
        <Select
          value={templateOptions.find(opt => opt.value === selectedTemplate)}
          onChange={(option) => setSelectedTemplate(option?.value || null)}
          options={templateOptions}
          className="mt-1"
          isClearable
        />
      </div>

      {selectedTemplate && (
        <ImportMapping
          templateId={selectedTemplate}
          value={fieldMapping}
          onChange={setFieldMapping}
        />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          {...register('comment')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update Import' : 'Create Import'}
      </button>
    </form>
  );
}