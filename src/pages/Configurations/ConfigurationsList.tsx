import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Settings, Edit, Trash2 } from 'lucide-react';
import { DataTable, Modal, PageHeader, ActionButton } from '../../components';
import { useRequireAuthServer } from '../../hooks/useRequireAuthServer';
import ConfigurationForm from '../../components/forms/ConfigurationForm';
import { getConfigurations, createConfiguration, updateConfiguration, deleteConfiguration } from '../../api';
import { PAYMENT_SYSTEMS, MAP_PROVIDERS } from '../../constants/configuration';
import type { Configuration } from '../../types';

export default function ConfigurationsList() {
  const queryClient = useQueryClient();
  const selectedServer = useRequireAuthServer();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<Configuration | null>(null);

  const { data: configurations = [], isLoading } = useQuery({
    queryKey: ['configurations', selectedServer?.id],
    queryFn: getConfigurations,
    enabled: !!selectedServer,
  });

  const filteredConfigurations = configurations.filter(
    config => config.company_guid === selectedServer?.id
  );

  const createMutation = useMutation({
    mutationFn: createConfiguration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configurations'] });
      toast.success('Configuration created successfully');
      setShowCreateForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Configuration> }) =>
      updateConfiguration(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configurations'] });
      toast.success('Configuration updated successfully');
      setEditingConfig(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteConfiguration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configurations'] });
      toast.success('Configuration deleted successfully');
    },
  });

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'dispatcher_phone',
      header: 'Dispatcher Phone',
    },
    {
      accessorKey: 'pay_system',
      header: 'Payment System',
      cell: ({ row }) => {
        switch (row.original.pay_system) {
          case PAYMENT_SYSTEMS.SBER:
            return 'Sberbank';
          case PAYMENT_SYSTEMS.IBOX:
            return 'iBox';
          default:
            return 'No Payment';
        }
      },
    },
    {
      accessorKey: 'map_type',
      header: 'Map Provider',
      cell: ({ row }) => {
        switch (row.original.map_type) {
          case MAP_PROVIDERS.GOOGLE:
            return 'Google Maps';
          case MAP_PROVIDERS.YANDEX:
            return 'Yandex Maps';
          case MAP_PROVIDERS.DGIS:
            return '2GIS';
          default:
            return 'Not Set';
        }
      },
    },
    {
      accessorKey: 'autopilot_enable',
      header: 'Autopilot',
      cell: ({ row }) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          row.original.autopilot_enable 
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.autopilot_enable ? 'Enabled' : 'Disabled'}
        </span>
      ),
    },
    {
      accessorKey: 'version',
      header: 'Version',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setEditingConfig(row.original)}
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
        title="Configurations"
        description="Manage system configurations and settings"
        action={
          <ActionButton
            onClick={() => setShowCreateForm(true)}
            icon={Settings}
          >
            Add Configuration
          </ActionButton>
        }
      />

      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Add Configuration"
      >
        <ConfigurationForm
          onSubmit={createMutation.mutate}
          serverId={selectedServer.id}
        />
      </Modal>

      <Modal
  isOpen={!!editingConfig}
  onClose={() => setEditingConfig(null)}
  title="Edit Configuration"
>
  {editingConfig && (
    <ConfigurationForm
    onSubmit={(data) => {
      // Удаляем системные поля перед отправкой на сервер
      const { id, guid, version, updated_at, ...filteredData } = data;
      updateMutation.mutate({ id: editingConfig.id, data: filteredData });
    }}
    initialData={editingConfig}
    serverId={selectedServer.id}
  />
  )}
</Modal>

      <DataTable
        data={filteredConfigurations}
        columns={columns}
        searchPlaceholder="Search configurations..."
      />
    </div>
  );
}