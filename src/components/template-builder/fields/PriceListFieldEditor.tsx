import React from 'react';
import BaseFieldEditor from './BaseFieldEditor';
import { PriceListField } from '../FieldTypes';
import { Plus, Trash2 } from 'lucide-react';

interface PriceListFieldEditorProps {
  field: PriceListField;
  onUpdate: (field: PriceListField) => void;
}

export default function PriceListFieldEditor({ field, onUpdate }: PriceListFieldEditorProps) {
  const handleAddItem = () => {
    const newItem = {
      ValueItem: crypto.randomUUID(),
      NameItem: 'New Item',
      Service: false,
      Gtin: '',
      Coeff: 1,
      CostPosition: 0,
      Count: 0,
      MinCount: 0,
      MaxCount: 100,
      UseCount: true
    };
    onUpdate({
      ...field,
      List: [...(field.List || []), newItem],
    });
  };

  const handleUpdateItem = (index: number, updatedItem: any) => {
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
      List: (field.List || []).filter((_, i) => i !== index),
    });
  };

  const calculateTotal = () => {
    return (field.List || []).reduce((sum, item) => {
      const count = Number(item.Count) || 0;
      const cost = Number(item.CostPosition) || 0;
      return sum + (count * cost);
    }, 0);
  };

  return (
    <BaseFieldEditor field={field} onUpdate={onUpdate}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">Price List Items</h4>
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold text-green-600">
              Total: ₽{calculateTotal().toLocaleString()}
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">GTIN</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Coeff</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(field.List || []).map((item, index) => (
                <tr key={item.ValueItem}>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={item.NameItem}
                      onChange={(e) => handleUpdateItem(index, { ...item, NameItem: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={item.Gtin}
                      onChange={(e) => handleUpdateItem(index, { ...item, Gtin: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={item.Service ? 'true' : 'false'}
                      onChange={(e) => handleUpdateItem(index, { ...item, Service: e.target.value === 'true' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="false">Product</option>
                      <option value="true">Service</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.Coeff}
                      onChange={(e) => handleUpdateItem(index, { ...item, Coeff: Number(e.target.value) })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.CostPosition}
                      onChange={(e) => handleUpdateItem(index, { ...item, CostPosition: Number(e.target.value) })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={item.Count}
                        onChange={(e) => handleUpdateItem(index, { ...item, Count: Number(e.target.value) })}
                        min={item.MinCount}
                        max={item.MaxCount}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        Number(item.Count) < Number(item.MinCount) ? 'bg-red-100 text-red-800' :
                        Number(item.Count) > Number(item.MaxCount) ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.Count}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseFieldEditor>
  );
}