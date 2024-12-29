import React from 'react';
import BaseFieldEditor from './BaseFieldEditor';
import { CheckboxField } from '../FieldTypes';
import { Plus, Trash2 } from 'lucide-react';

interface CheckboxFieldEditorProps {
  field: CheckboxField;
  onUpdate: (field: CheckboxField) => void;
}

export default function CheckboxFieldEditor({ field, onUpdate }: CheckboxFieldEditorProps) {
  const handleAddItem = () => {
    const newItems = [...(field.Items || []), { id: crypto.randomUUID(), label: 'New Item' }];
    onUpdate({ ...field, Items: newItems });
  };

  const handleUpdateItem = (index: number, label: string) => {
    const newItems = [...(field.Items || [])];
    newItems[index] = { ...newItems[index], label };
    onUpdate({ ...field, Items: newItems });
  };

  const handleDeleteItem = (index: number) => {
    const newItems = field.Items?.filter((_, i) => i !== index);
    onUpdate({ ...field, Items: newItems });
  };

  return (
    <BaseFieldEditor field={field} onUpdate={onUpdate}>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.ThreeStates}
              onChange={(e) => onUpdate({ ...field, ThreeStates: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Three States</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.Checked}
              onChange={(e) => onUpdate({ ...field, Checked: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Default Checked</span>
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-700">Checkbox Items</h4>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>

          {field.Items?.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <input
                type="text"
                value={item.label}
                onChange={(e) => handleUpdateItem(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleDeleteItem(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </BaseFieldEditor>
  );
}