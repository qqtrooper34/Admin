import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAgentsApi } from '../../api/agents';
import { DataTable, PageHeader, ActionButton, Modal } from '../../components';
import { useRequireAuthServer } from '../../hooks/useRequireAuthServer';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import AgentForm from './AgentForm';
import type { Agent } from '../../types';

export default function AgentsList() {
  const queryClient = useQueryClient();
  const selectedServer = useRequireAuthServer();
  const agentsApi = useAgentsApi();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents', selectedServer?.id],
    queryFn: agentsApi.getAgents,
    enabled: !!selectedServer,
  });

  const createMutation = useMutation({
    mutationFn: agentsApi.createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent created successfully');
      setShowCreateForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ pk, data }: { pk: string; data: Partial<Agent> }) =>
      agentsApi.updateAgent(pk, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent updated successfully');
      setEditingAgent(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: agentsApi.deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast.success('Agent deleted successfully');
    },
  });

  const columns = [
   {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'time_start',
      header: 'Start Time',
    },
    {
      accessorKey: 'time_end', 
      header: 'End Time',
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          row.original.is_active 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.original.is_active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setEditingAgent(row.original)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteMutation.mutate(row.original.pk)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agents"
        description="Manage delivery agents and their assignments"
        action={
          <ActionButton
            onClick={() => setShowCreateForm(true)}
            icon={UserPlus}
          >
            Add Agent
          </ActionButton>
        }
      />

      <Modal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        title="Add Agent"
      >
        <AgentForm onSubmit={createMutation.mutate} />
      </Modal>

      <Modal
        isOpen={!!editingAgent}
        onClose={() => setEditingAgent(null)}
        title="Edit Agent"
      >
        {editingAgent && (
          <AgentForm
            initialData={editingAgent}
            onSubmit={(data) => updateMutation.mutate({ pk: editingAgent.pk, data })}
          />
        )}
      </Modal>

      <DataTable
        data={agents}
        columns={columns}
        searchPlaceholder="Search agents..."
      />
    </div>
  );
}