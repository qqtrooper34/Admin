import React from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { getAuthServers } from '../api';
import { useAuthServer } from '../contexts/AuthServerContext';
import { Server } from 'lucide-react';

export function ServerSelector() {
  const { selectedServer, setSelectedServer } = useAuthServer();
  const { data: servers = [] } = useQuery({
    queryKey: ['authServers'],
    queryFn: getAuthServers,
  });

  const options = servers.map(server => ({
    value: server.id,
    label: server.name,
    server,
  }));

  const customStyles = {
    control: (base: any) => ({
      ...base,
      minWidth: '300px',
      background: '#f9fafb',
      borderColor: '#e5e7eb',
      '&:hover': {
        borderColor: '#6366f1'
      }
    }),
    option: (base: any, state: any) => ({
      ...base,
      background: state.isSelected ? '#4f46e5' : state.isFocused ? '#e0e7ff' : 'white',
      color: state.isSelected ? 'white' : '#374151',
    }),
  };

  return (
    <div className="w-72">
      <Select
        value={selectedServer ? {
          value: selectedServer.id,
          label: selectedServer.name,
          server: selectedServer,
        } : null}
        onChange={(option) => setSelectedServer(option ? option.server : null)}
        options={options}
        isClearable
        placeholder="Select Auth Server..."
        components={{
          DropdownIndicator: () => <Server className="h-4 w-4 text-gray-400 mr-2" />
        }}
        styles={customStyles}
        className="text-sm"
      />
    </div>
  );
}