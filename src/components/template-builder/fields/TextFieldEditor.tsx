import React from 'react';
import BaseFieldEditor from './BaseFieldEditor';
import { TextField } from '../FieldTypes';

interface TextFieldEditorProps {
  field: TextField;
  onUpdate: (field: TextField) => void;
}

export default function TextFieldEditor({ field, onUpdate }: TextFieldEditorProps) {
  return (
    <BaseFieldEditor field={field} onUpdate={onUpdate}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Length</label>
          <input
            type="number"
            name="MinLen"
            value={field.MinLen || ''}
            onChange={(e) => onUpdate({ ...field, MinLen: parseInt(e.target.value) || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Length</label>
          <input
            type="number"
            name="MaxLen"
            value={field.MaxLen || ''}
            onChange={(e) => onUpdate({ ...field, MaxLen: parseInt(e.target.value) || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </BaseFieldEditor>
  );
}