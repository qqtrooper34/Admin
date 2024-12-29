import React from 'react';
import { Field, FieldType } from './FieldTypes';
import TextFieldEditor from './fields/TextFieldEditor';
import NumberFieldEditor from './fields/NumberFieldEditor';
import DateTimeFieldEditor from './fields/DateTimeFieldEditor';
import CheckboxFieldEditor from './fields/CheckboxFieldEditor';
import ListFieldEditor from './fields/ListFieldEditor';
import PriceListFieldEditor from './fields/PriceListFieldEditor';
import ConfirmFieldEditor from './fields/ConfirmFieldEditor';

interface FieldEditorProps {
  field: Field;
  onUpdate: (field: Field) => void;
  onDelete: () => void;
}

export default function FieldEditor({ field, onUpdate, onDelete }: FieldEditorProps) {
  const renderEditor = () => {
    switch (field.Type) {
      case FieldType.Text:
        return <TextFieldEditor field={field} onUpdate={onUpdate} />;
      case FieldType.Number:
      case FieldType.Decimal:
        return <NumberFieldEditor field={field} onUpdate={onUpdate} />;
      case FieldType.DateTime:
        return <DateTimeFieldEditor field={field} onUpdate={onUpdate} />;
      case FieldType.Checkbox:
        return <CheckboxFieldEditor field={field} onUpdate={onUpdate} />;
      case FieldType.List:
        return <ListFieldEditor field={field} onUpdate={onUpdate} />;
      case FieldType.PriceList:
        return <PriceListFieldEditor field={field} onUpdate={onUpdate} />;
      case FieldType.Confirm:
        return <ConfirmFieldEditor field={field} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{field.Sign}</h3>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
        >
          Delete Field
        </button>
      </div>
      {renderEditor()}
    </div>
  );
}