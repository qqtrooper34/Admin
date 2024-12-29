import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Download, Edit, Trash2 } from 'lucide-react';
import { DataTable, Modal, PageHeader, ActionButton } from '../../components';
import { useRequireAuthServer } from '../../hooks/useRequireAuthServer';
import ImportForm from './ImportForm';
import { getImportsByCompany, createImport, updateImport, deleteImport } from '../../api';
import type { Import } from '../../types';

export default function ImportsList() {
  const queryClient = useQueryClient();
  const selectedServer = useRequireAuthServer();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingImport, setEditingImport] = useState<Import | null>(null);

  const { data: imports = [], isLoading } = useQuery({
    queryKey: ['imports', selectedServer?.id],
    queryFn: () => selectedServer ? getImportsByCompany(selectedServer.id) : Promise.resolve([]),
    enabled: !!selectedServer,
  });

  const createMutation = useMutation({
    mutationFn: createImport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] });
      toast.success('Import created successfully');
      setShowCreateForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Import> }) =>
      updateImport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] });
      toast.success('Import updated successfully');
      setEditingImport(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] });
      toast.success('Import deleted successfully');
    },
  });

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'comment',
      header: 'Comment',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setEditingImport(row.original)}
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
        title="Imports"
        description="Manage data imports and related tasks"
        action={
          <ActionButton
            onClick={() => setShowCreateForm(true)}
            icon={Download}
          >
            Add Import
          </ActionButton>
        }
      />

      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Add Import"
      >
        <ImportForm
          onSubmit={createMutation.mutate}
          serverId={selectedServer.id}
        />
      </Modal>

      <Modal
        isOpen={!!editingImport}
        onClose={() => setEditingImport(null)}
        title="Edit Import"
      >
        {editingImport && (
          <ImportForm
            onSubmit={(data) => updateMutation.mutate({ id: editingImport.guid, data })}
            initialData={editingImport}
            serverId={selectedServer.id}
          />
        )}
      </Modal>

      <DataTable
        data={imports}
        columns={columns}
        searchPlaceholder="Search imports..."
      />
    </div>
  );
}