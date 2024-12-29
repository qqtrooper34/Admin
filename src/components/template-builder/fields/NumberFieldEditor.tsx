import React from 'react';
import BaseFieldEditor from './BaseFieldEditor';
import { NumberField } from '../FieldTypes';

interface NumberFieldEditorProps {
  field: NumberField;
  onUpdate: (field: NumberField) => void;
}

export default function NumberFieldEditor({ field, onUpdate }: NumberFieldEditorProps) {
  return (
    <BaseFieldEditor field={field} onUpdate={onUpdate}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Value</label>
          <input
            type="number"
            name="Min"
            value={field.Min || ''}
            onChange={(e) => onUpdate({ ...field, Min: parseFloat(e.target.value) || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Value</label>
          <input
            type="number"
            name="Max"
            value={field.Max || ''}
            onChange={(e) => onUpdate({ ...field, Max: parseFloat(e.target.value) || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precision</label>
          <input
            type="number"
            name="Precision"
            min="0"
            max="10"
            value={field.Precision || ''}
            onChange={(e) => onUpdate({ ...field, Precision: parseInt(e.target.value) || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </BaseFieldEditor>
  );
}