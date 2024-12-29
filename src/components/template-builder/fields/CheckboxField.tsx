import React from 'react';
import { Field } from '../FieldTypes';

interface CheckboxItem {
  id: string;
  label: string;
  checked?: boolean;
}

interface CheckboxFieldProps {
  field: Field;
  onUpdate: (field: Field) => void;
}

export default function CheckboxField({ field, onUpdate }: CheckboxFieldProps) {
  const handleAddItem = () => {
    const newItems = [...(field.Items || []), { 
      id: crypto.randomUUID(), 
      label: 'New Item',
      checked: false 
    }];
    onUpdate({ ...field, Items: newItems });
  };

  const handleItemChange = (itemId: string, checked: boolean) => {
    const newItems = field.Items?.map(item => 
      item.id === itemId ? { ...item, checked } : item
    );
    onUpdate({ ...field, Items: newItems });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{field.Sign}</h3>
        <button
          onClick={handleAddItem}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Add Item
        </button>
      </div>
      
      <div className="space-y-2">
        {field.Items?.map(item => (
          <label key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => handleItemChange(item.id, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}