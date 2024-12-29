import React from 'react';
import { booleanToString } from '../utils/fieldUtils';
import type { Field } from '../FieldTypes';

interface BaseFieldEditorProps {
  field: Field;
  onUpdate: (field: Field) => void;
  children?: React.ReactNode;
}

export default function BaseFieldEditor({ field, onUpdate, children }: BaseFieldEditorProps) {
  const handleChange = (key: keyof Field, value: string | boolean) => {
    onUpdate({
      ...field,
      [key]: typeof value === 'boolean' ? booleanToString(value) : value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Label</label>
          <input
            type="text"
            value={field.Sign}
            onChange={(e) => handleChange('Sign', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Default Value</label>
          <input
            type="text"
            value={field.Value || ''}
            onChange={(e) => handleChange('Value', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={field.Visible === "True"}
            onChange={(e) => handleChange('Visible', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Visible</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={field.Editable === "True"}
            onChange={(e) => handleChange('Editable', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Editable</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={field.Required === "True"}
            onChange={(e) => handleChange('Required', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Required</span>
        </label>
      </div>

      {children}
    </div>
  );
}