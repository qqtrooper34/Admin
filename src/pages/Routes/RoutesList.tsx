import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoutesApi } from '../../api/routes';
import { DataTable, PageHeader } from '../../components';
import { useRequireAuthServer } from '../../hooks/useRequireAuthServer';
import type { Route } from '../../types';

export default function RoutesList() {
  const selectedServer = useRequireAuthServer();
  const routesApi = useRoutesApi();
  
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ['routes', selectedServer?.id],
    queryFn: () => routesApi.getRoutes(),
    enabled: !!selectedServer,
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
      accessorKey: 'driver',
      header: 'Driver',
    },
    {
      accessorKey: 'begin_time',
      header: 'Start Time',
    },
    {
      accessorKey: 'end_time',
      header: 'End Time',
    },
    {
      accessorKey: 'route_stops',
      header: 'Stops',
    },
    {
      accessorKey: 'route_weight',
      header: 'Weight',
      cell: ({ row }) => `${row.original.route_weight?.toFixed(2) || 0} kg`,
    },
    {
      accessorKey: 'route_volume',
      header: 'Volume',
      cell: ({ row }) => `${row.original.route_volume?.toFixed(2) || 0} m³`,
    },
  ];

  if (!selectedServer) return null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Routes"
        description="View and manage delivery routes"
      />

      <DataTable
        data={routes}
        columns={columns}
        searchPlaceholder="Search routes..."
      />
    </div>
  );
}