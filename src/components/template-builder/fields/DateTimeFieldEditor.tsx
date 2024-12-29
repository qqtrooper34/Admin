import React from 'react';
import BaseFieldEditor from './BaseFieldEditor';
import { DateTimeField } from '../FieldTypes';

interface DateTimeFieldEditorProps {
  field: DateTimeField;
  onUpdate: (field: DateTimeField) => void;
}

export default function DateTimeFieldEditor({ field, onUpdate }: DateTimeFieldEditorProps) {
  return (
    <BaseFieldEditor field={field} onUpdate={onUpdate}>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="UseDate"
            checked={field.UseDate}
            onChange={(e) => onUpdate({ ...field, UseDate: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Use Date</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="UseTime"
            checked={field.UseTime}
            onChange={(e) => onUpdate({ ...field, UseTime: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Use Time</span>
        </label>
      </div>
    </BaseFieldEditor>
  );
}