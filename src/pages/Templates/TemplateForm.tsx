import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Template } from '../../types';
import TemplateBuilder from '../../components/template-builder/TemplateBuilder';
import { ButtonConfig } from '../../components/template-builder/buttons/ButtonConfig';
import { defaultTaskButtons } from '../../components/template-builder/buttons/defaultButtons';
import type { Field } from '../../components/template-builder/FieldTypes';

interface TemplateFormProps {
  onSubmit: (data: Partial<Template>) => void;
  initialData?: Template;
  serverId: string;
}

export default function TemplateForm({ onSubmit, initialData, serverId }: TemplateFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...initialData,
      company_guid: serverId,
      task_buttons: typeof initialData?.task_buttons === 'string' 
        ? initialData.task_buttons 
        : JSON.stringify(initialData?.task_buttons || defaultTaskButtons),
      task_buttons_extra: typeof initialData?.task_buttons_extra === 'string'
        ? initialData.task_buttons_extra
        : JSON.stringify(initialData?.task_buttons_extra || { ButtonParamsList: [] }),
    },
  });

  const taskButtons = watch('task_buttons');
  const taskButtonsExtra = watch('task_buttons_extra');

  const [fields, setFields] = useState<Field[]>(() => {
    if (!initialData?.data) return [];
    return initialData.data.Fields || [];
  });

  const handleTaskButtonsChange = (buttons: any[]) => {
    const buttonData = buttons.map(button => ({
      ...button,
      ShowForm: "True",
      ShowList: "False",
      UseButton: "True",
      ShowAlways: "False",
      UseMessage: "False",
      MessageText: "",
      ButtonUserStatus: "",
    }));
    setValue('task_buttons', JSON.stringify({ ButtonParamsList: buttonData }));
  };

  const handleExtraButtonsChange = (buttons: any[]) => {
    const buttonData = buttons.map(button => ({
      ...button,
      ShowForm: "True",
      ShowList: "True",
      UseButton: "True",
      ButtonType: "4",
      Is_pressed: false,
      ShowAlways: "False",
      UseMessage: "False",
      MessageText: button.ButtonUserStatus || "",
      ButtonUserStatus: button.ButtonUserStatus || "",
    }));
    setValue('task_buttons_extra', JSON.stringify({ ButtonParamsList: buttonData }));
  };

  const handleFieldsChange = (updatedFields: Field[]) => {
    setFields(updatedFields);
  };

  const handleFormSubmit = (formData: any) => {
    const processedFields = fields.map(field => {
      const baseField = {
        Guid: field.Guid,
        Sign: field.Sign,
        Type: field.Type,
        Value: "",
        Visible: field.Visible ? "True" : "False",
        Editable: field.Editable ? "True" : "False",
        Required: field.Required ? "True" : "False",
        SignVisible: "True",
        ConfirmRequired: "False",
      };

      if (field.Type === "1") {
        return {
          ...baseField,
          MaxLen: field.MaxLen?.toString() || "500",
          MinLen: field.MinLen?.toString() || "0",
          UseBarcode: "False",
          MarkBarCode: "False",
          CorrectBarCodeEnd: "0",
          CorrectBarCodeStart: "0",
        };
      }

      if (field.Type === "6") {
        return {
          ...baseField,
          Filled: "False",
          Checked: "False",
          ThreeStates: "False",
        };
      }

      return baseField;
    });

    const data = {
      ...formData,
      task_buttons: typeof formData.task_buttons === 'string' 
        ? JSON.parse(formData.task_buttons)
        : formData.task_buttons,
      task_buttons_extra: typeof formData.task_buttons_extra === 'string'
        ? JSON.parse(formData.task_buttons_extra)
        : formData.task_buttons_extra,
      data: {
        Fields: processedFields,
      },
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Task Buttons</label>
        <ButtonConfig
          buttons={typeof taskButtons === 'string' 
            ? JSON.parse(taskButtons).ButtonParamsList 
            : taskButtons.ButtonParamsList}
          onChange={handleTaskButtonsChange}
          isExtra={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Extra Task Buttons</label>
        <ButtonConfig
          buttons={typeof taskButtonsExtra === 'string'
            ? JSON.parse(taskButtonsExtra).ButtonParamsList
            : taskButtonsExtra.ButtonParamsList}
          onChange={handleExtraButtonsChange}
          isExtra={true}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Template Fields</label>
        <div className="border rounded-lg p-4 bg-gray-50">
          <TemplateBuilder
            initialFields={fields}
            onChange={handleFieldsChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update Template' : 'Create Template'}
      </button>
    </form>
  );
}