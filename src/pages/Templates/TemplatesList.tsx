import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FileText, Edit, Trash2, Eye } from 'lucide-react';
import { DataTable, Modal, PageHeader, ActionButton } from '../../components';
import { useRequireAuthServer } from '../../hooks/useRequireAuthServer';
import TemplateForm from './TemplateForm';
import TemplatePreview from '../../components/template-builder/TemplatePreview';
import { getTemplatesByCompany, createTemplate, updateTemplate, deleteTemplate } from '../../api';
import type { Template } from '../../types';

export default function TemplatesList() {
  const queryClient = useQueryClient();
  const selectedServer = useRequireAuthServer();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates', selectedServer?.id],
    queryFn: () => selectedServer ? getTemplatesByCompany(selectedServer.id) : Promise.resolve([]),
    enabled: !!selectedServer,
  });

  const createMutation = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template created successfully');
      setShowCreateForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Template> }) =>
      updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template updated successfully');
      setEditingTemplate(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template deleted successfully');
    },
  });

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewTemplate(row.original)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => setEditingTemplate(row.original)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteMutation.mutate(row.original.guid)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  if (!selectedServer) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Templates"
        description="Manage templates for various purposes"
        action={
          <ActionButton
            onClick={() => setShowCreateForm(true)}
            icon={FileText}
          >
            Add Template
          </ActionButton>
        }
      />

      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Add Template"
      >
        <TemplateForm
          onSubmit={createMutation.mutate}
          serverId={selectedServer.id}
        />
      </Modal>

      <Modal
        isOpen={!!editingTemplate}
        onClose={() => setEditingTemplate(null)}
        title="Edit Template"
      >
        {editingTemplate && (
          <TemplateForm
            onSubmit={(data) => updateMutation.mutate({ id: editingTemplate.guid, data })}
            initialData={editingTemplate}
            serverId={selectedServer.id}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={`Preview: ${previewTemplate?.name || ''}`}
      >
        {previewTemplate && (
      <TemplatePreview
      fields={previewTemplate.data?.Fields || []}
      taskButtons={previewTemplate.task_buttons || { ButtonParamsList: [] }}
      taskButtonsExtra={previewTemplate.task_buttons_extra || { ButtonParamsList: [] }}
  />
        )}
      </Modal>

      <DataTable
        data={templates}
        columns={columns}
        searchPlaceholder="Search templates..."
      />
    </div>
  );
}