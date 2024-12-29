import React from 'react';
import { Field } from './FieldTypes';

interface TemplatePreviewProps {
  fields: Field[];
  taskButtons: any;
  taskButtonsExtra: any;
}

export default function TemplatePreview({ fields, taskButtons, taskButtonsExtra }: TemplatePreviewProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="space-y-6">
        {/* Task Buttons */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Task Buttons</h3>
          <div className="flex gap-2">
            {taskButtons?.ButtonParamsList?.map((button: any) => (
              <button
                key={button.ButtonType}
                className="px-3 py-1 text-sm bg-gray-100 rounded-md"
              >
                {button.Name || 'Unnamed Button'}
              </button>
            ))}
          </div>
        </div>

        {/* Extra Buttons */}
        {taskButtonsExtra?.ButtonParamsList?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Extra Buttons</h3>
            <div className="flex gap-2">
              {taskButtonsExtra.ButtonParamsList.map((button: any) => (
                <button
                  key={button.ButtonType}
                  className="px-3 py-1 text-sm bg-blue-100 rounded-md"
                >
                  {button.Name || 'Unnamed Button'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fields */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Fields</h3>
          {fields.map((field) => (
            <div key={field.Guid} className="border rounded p-3">
              <label className="block text-sm font-medium text-gray-700">
                {field.Sign}
              </label>
              {field.Type === '1' && (
                <input
                  type="text"
                  disabled={!field.Editable}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                  placeholder="Text input"
                />
              )}
              {field.Type === '6' && (
                <div className="mt-1">
                  <input
                    type="checkbox"
                    disabled={!field.Editable}
                    className="rounded border-gray-300 text-indigo-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}