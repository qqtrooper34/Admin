import React, { useState } from 'react';
import { Field, FieldType } from './FieldTypes';
import FieldEditor from './FieldEditor';
import { Plus } from 'lucide-react';

interface TemplateBuilderProps {
  initialFields?: Field[];
  onChange: (fields: Field[]) => void;
}

export default function TemplateBuilder({ initialFields = [], onChange }: TemplateBuilderProps) {
  const [fields, setFields] = useState<Field[]>(initialFields);

  const handleAddField = (type: FieldType, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    const newField: Field = {
      Guid: crypto.randomUUID(),
      Type: type,
      Sign: `New ${type} Field`,
      Visible: true,
      Editable: true,
    };

    const updatedFields = [...fields, newField];
    setFields(updatedFields);
    onChange(updatedFields);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.values(FieldType).map((type) => (
          <button
            key={type}
            onClick={(e) => handleAddField(type, e)}
            type="button" // Explicitly set button type
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {type} Field
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <FieldEditor
            key={field.Guid}
            field={field}
            onUpdate={(updatedField) => {
              const updatedFields = [...fields];
              updatedFields[index] = updatedField;
              setFields(updatedFields);
              onChange(updatedFields);
            }}
            onDelete={() => {
              const updatedFields = fields.filter((_, i) => i !== index);
              setFields(updatedFields);
              onChange(updatedFields);
            }}
          />
        ))}
      </div>
    </div>
  );
}