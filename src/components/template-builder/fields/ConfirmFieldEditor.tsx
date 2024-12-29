import React from 'react';
import BaseFieldEditor from './BaseFieldEditor';
import { ConfirmField } from '../FieldTypes';

interface ConfirmFieldEditorProps {
  field: ConfirmField;
  onUpdate: (field: ConfirmField) => void;
}

export default function ConfirmFieldEditor({ field, onUpdate }: ConfirmFieldEditorProps) {
  return (
    <BaseFieldEditor field={field} onUpdate={onUpdate}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Control Value</label>
          <input
            type="text"
            value={field.ReserveValue || ''}
            onChange={(e) => onUpdate({ ...field, ReserveValue: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter control value"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">User Value</label>
          <input
            type="text"
            value={field.UserValue || ''}
            onChange={(e) => onUpdate({ ...field, UserValue: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter user value"
          />
        </div>
      </div>
    </BaseFieldEditor>
  );
}