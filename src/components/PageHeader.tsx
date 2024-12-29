import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </div>
      {action && (
        <div className="mt-4 sm:ml-16 sm:mt-0">
          {action}
        </div>
      )}
    </div>
  );
}