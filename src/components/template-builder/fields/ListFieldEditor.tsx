import React from 'react';
import BaseFieldEditor from './BaseFieldEditor';
import { ListField, ListItem } from '../FieldTypes';
import { Plus, Trash2 } from 'lucide-react';

interface ListFieldEditorProps {
  field: ListField;
  onUpdate: (field: ListField) => void;
}

export default function ListFieldEditor({ field, onUpdate }: ListFieldEditorProps) {
  const handleAddItem = () => {
    const newItem: ListItem = {
      ValueItem: crypto.randomUUID(),
      NameItem: 'New Item',
      Count: 0,
      MinCount: 0,
      MaxCount: 100,
    };
    onUpdate({
      ...field,
      List: [...(field.List || []), newItem],
    });
  };

  const handleUpdateItem = (index: number, updatedItem: ListItem) => {
    const updatedList = [...(field.List || [])];
    updatedList[index] = updatedItem;
    onUpdate({
      ...field,
      List: updatedList,
    });
  };

  const handleDeleteItem = (index: number) => {
    onUpdate({
      ...field,
      List: field.List.filter((_, i) => i !== index),
    });
  };

  return (
    <BaseFieldEditor field={field} onUpdate={onUpdate}>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="UseMultiSelect"
              checked={field.UseMultiSelect}
              onChange={(e) => onUpdate({ ...field, UseMultiSelect: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Multi Select</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="EditCount"
              checked={field.EditCount}
              onChange={(e) => onUpdate({ ...field, EditCount: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Edit Count</span>
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-700">List Items</h4>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>

          {field.List?.map((item, index) => (
            <div key={item.ValueItem} className="grid grid-cols-5 gap-2 items-center">
              <input
                type="text"
                value={item.NameItem}
                onChange={(e) => handleUpdateItem(index, { ...item, NameItem: e.target.value })}
                className="col-span-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Item Name"
              />
              <input
                type="number"
                value={item.MinCount}
                onChange={(e) => handleUpdateItem(index, { ...item, MinCount: parseInt(e.target.value) })}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Min"
              />
              <input
                type="number"
                value={item.MaxCount}
                onChange={(e) => handleUpdateItem(index, { ...item, MaxCount: parseInt(e.target.value) })}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Max"
              />
              <button
                type="button"
                onClick={() => handleDeleteItem(index)}
                className="inline-flex items-center justify-center text-red-600 hover:text-red-800"
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