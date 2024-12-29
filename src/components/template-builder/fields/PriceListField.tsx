import React from 'react';
import { Plus } from 'lucide-react';
import { Field } from '../FieldTypes';

interface PriceListItem {
  ValueItem: string;
  NameItem: string;
  Service: boolean;
  Gtin: string;
  Coeff: number;
  CostPosition: number;
  Count: number;
  MinCount: number;
  MaxCount: number;
  UseCount: boolean;
}

interface PriceListFieldProps {
  field: Field;
  onUpdate: (field: Field) => void;
}

export default function PriceListField({ field, onUpdate }: PriceListFieldProps) {
  const calculateTotal = (items: PriceListItem[]) => {
    return items.reduce((sum, item) => {
      return sum + (item.CostPosition * item.Count);
    }, 0);
  };

  const getGroupTotal = (items: PriceListItem[], isService: boolean) => {
    return items
      .filter(item => item.Service === isService)
      .reduce((sum, item) => sum + (item.CostPosition * item.Count), 0);
  };

  const handleAddItem = (isService: boolean) => {
    const newItem: PriceListItem = {
      ValueItem: crypto.randomUUID(),
      NameItem: 'New Item',
      Service: isService,
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
      List: [...(field.List || []), newItem]
    });
  };

  const handleUpdateItem = (index: number, updates: Partial<PriceListItem>) => {
    const newList = [...field.List];
    newList[index] = { ...newList[index], ...updates };
    onUpdate({ ...field, List: newList });
  };

  const getCountColor = (count: number, min: number, max: number) => {
    if (count < min) return 'text-red-600';
    if (count > max) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{field.Sign}</h3>
        <div className="text-lg font-semibold text-green-600">
          Total: ₽{calculateTotal(field.List || []).toLocaleString()}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleAddItem(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
          <button
            onClick={() => handleAddItem(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">GTIN</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Coeff</th>
                <th className="px-4 py-2 text-left">Cost</th>
                <th className="px-4 py-2 text-left">Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(field.List || []).map((item, index) => (
                <tr key={item.ValueItem}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.NameItem}
                      onChange={(e) => handleUpdateItem(index, { NameItem: e.target.value })}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.Gtin}
                      onChange={(e) => handleUpdateItem(index, { Gtin: e.target.value })}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={item.Service.toString()}
                      onChange={(e) => handleUpdateItem(index, { Service: e.target.value === 'true' })}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="false">Product</option>
                      <option value="true">Service</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.Coeff}
                      onChange={(e) => handleUpdateItem(index, { Coeff: Number(e.target.value) })}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.CostPosition}
                      onChange={(e) => handleUpdateItem(index, { CostPosition: Number(e.target.value) })}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.Count}
                        onChange={(e) => handleUpdateItem(index, { Count: Number(e.target.value) })}
                        min={item.MinCount}
                        max={item.MaxCount}
                        className="w-20 border rounded px-2 py-1"
                      />
                      <span className={getCountColor(item.Count, item.MinCount, item.MaxCount)}>
                        {item.Count}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}