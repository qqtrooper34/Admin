import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDevicesApi } from '../../api/devices';
import { useAgentsApi } from '../../api/agents';
import { DataTable, PageHeader } from '../../components';
import { useRequireAuthServer } from '../../hooks/useRequireAuthServer';
import { formatDistanceToNow } from 'date-fns';
import { Battery, Signal, HardDrive, AlertTriangle } from 'lucide-react';
import Select from 'react-select';

const getOptimizationStatus = (device: any) => {
  const hasOptimizationIssue = device.optimizationenabled;  // Should be false
  const hasBackgroundIssue = !device.backgroundworkenabled; // Should be true
  
  if (hasOptimizationIssue && hasBackgroundIssue) {
    return { color: 'bg-red-100 text-red-800', status: 'Critical' };
  } else if (hasOptimizationIssue || hasBackgroundIssue) {
    return { color: 'bg-yellow-100 text-yellow-800', status: 'Warning' };
  }
  return { color: 'bg-green-100 text-green-800', status: 'Good' };
};

export default function DevicesList() {
  const selectedServer = useRequireAuthServer();
  const devicesApi = useDevicesApi();
  const agentsApi = useAgentsApi();
  
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: devices = [], isLoading: isLoadingDevices } = useQuery({
    queryKey: ['devices', selectedServer?.id],
    queryFn: devicesApi.getDevices,
    enabled: !!selectedServer,
  });

  const { data: agents = [], isLoading: isLoadingAgents } = useQuery({
    queryKey: ['agents', selectedServer?.id],
    queryFn: agentsApi.getAgents,
    enabled: !!selectedServer,
  });

  const agentsMap = React.useMemo(() => {
    return agents.reduce((acc, agent) => {
      acc[agent.pk] = agent;
      return acc;
    }, {} as Record<string, typeof agents[0]>);
  }, [agents]);

  const filteredDevices = React.useMemo(() => {
    let filtered = [...devices];
    
    if (selectedAgent) {
      filtered = filtered.filter(device => String(device.pk_agent) === String(selectedAgent));
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(device => {
        const modelName = (device.model_name || '').toLowerCase();
        const systemName = (device.system_name || '').toLowerCase();
        const appVersion = (device.app_version || '').toLowerCase();
        const operName = (device.mob_oper_name || '').toLowerCase();
        const agentName = agentsMap[device.pk_agent]?.name.toLowerCase() || '';
        const agentPhone = agentsMap[device.pk_agent]?.phone.toLowerCase() || '';
        
        return modelName.includes(search) ||
               systemName.includes(search) ||
               appVersion.includes(search) ||
               operName.includes(search) ||
               agentName.includes(search) ||
               agentPhone.includes(search);
      });
    }

    return filtered;
  }, [devices, selectedAgent, searchTerm, agentsMap]);

  const agentOptions = agents.map(agent => ({
    value: agent.pk,
    label: `${agent.name} (${agent.phone})`,
  }));

  const columns = [
    {
      accessorKey: 'model_name',
      header: 'Device Model',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.model_name || 'Unknown'}</div>
          <div className="text-sm text-gray-500">{row.original.system_name}</div>
        </div>
      ),
    },
    {
      accessorKey: 'pk_agent',
      header: 'Agent',
      cell: ({ row }) => {
        const agent = agentsMap[row.original.pk_agent];
        return agent ? (
          <div className="text-sm">
            <div className="font-medium">{agent.name}</div>
            <div className="text-gray-500">{agent.phone}</div>
          </div>
        ) : 'Unassigned';
      }
    },
    {
      accessorKey: 'optimization_status',
      header: 'Optimization Status',
      cell: ({ row }) => {
        const { color, status } = getOptimizationStatus(row.original);
        return (
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {status !== 'Good' && <AlertTriangle className="w-4 h-4 mr-1" />}
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Battery className="w-4 h-4 mr-1" />
            <span>{row.original.battery || 0}%</span>
          </div>
          <div className="flex items-center">
            <Signal className="w-4 h-4 mr-1" />
            <span>{row.original.mob_oper_name || 'Unknown'}</span>
          </div>
          <div className="flex items-center">
            <HardDrive className="w-4 h-4 mr-1" />
            <span>{row.original.mem_free || 0}MB</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'app_version',
      header: 'App Version',
    },
    {
      accessorKey: 'system_version',
      header: 'System Version',
    },
    {
      accessorKey: 'dev_last_packet',
      header: 'Last Active',
      cell: ({ row }) => {
        if (!row.original.dev_last_packet) return 'Never';
        try {
          const lastActive = new Date(row.original.dev_last_packet);
          return formatDistanceToNow(lastActive, { addSuffix: true });
        } catch {
          return 'Invalid date';
        }
      },
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.original.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.original.is_active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  if (!selectedServer) return null;
  if (isLoadingDevices || isLoadingAgents) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Devices"
        description="View and manage connected devices"
      />

      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Agent
            </label>
            <Select
              value={agentOptions.find(opt => opt.value === selectedAgent)}
              onChange={(option) => setSelectedAgent(option?.value || null)}
              options={agentOptions}
              isClearable
              placeholder="Select agent..."
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Devices
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by model, system, operator or agent..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <DataTable
        data={filteredDevices}
        columns={columns}
        searchPlaceholder="Search devices..."
      />
    </div>
  );
}