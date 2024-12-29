import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ButtonConfig {
  Name: string;
  ApiCall: string;
  ShowForm: string;
  ShowList: string;
  UseButton: string;
  ButtonType: string;
  ShowAlways: string;
  UseMessage: string;
  MessageText: string;
  ButtonUserStatus: string;
}

interface TaskButtonsConfigProps {
  value: string;
  onChange: (value: string) => void;
}

const defaultButtons: ButtonConfig[] = [
  {
    Name: "Start",
    ApiCall: "",
    ShowForm: "True",
    ShowList: "False",
    UseButton: "True",
    ButtonType: "0",
    ShowAlways: "False",
    UseMessage: "False",
    MessageText: "",
    ButtonUserStatus: ""
  },
  {
    Name: "Moving",
    ApiCall: "",
    ShowForm: "True",
    ShowList: "False",
    UseButton: "True",
    ButtonType: "1",
    ShowAlways: "False",
    UseMessage: "False",
    MessageText: "",
    ButtonUserStatus: ""
  },
  {
    Name: "Complete",
    ApiCall: "",
    ShowForm: "True",
    ShowList: "False",
    UseButton: "True",
    ButtonType: "2",
    ShowAlways: "False",
    UseMessage: "False",
    MessageText: "",
    ButtonUserStatus: ""
  },
  {
    Name: "Problem",
    ApiCall: "",
    ShowForm: "True",
    ShowList: "False",
    UseButton: "True",
    ButtonType: "3",
    ShowAlways: "False",
    UseMessage: "False",
    MessageText: "",
    ButtonUserStatus: ""
  }
];

export function TaskButtonsConfig({ value, onChange }: TaskButtonsConfigProps) {
  const [buttons, setButtons] = React.useState<ButtonConfig[]>(() => {
    try {
      const parsed = JSON.parse(value || '{}');
      return parsed.ButtonParamsList || defaultButtons;
    } catch {
      return defaultButtons;
    }
  });

  const handleButtonChange = (index: number, field: keyof ButtonConfig, newValue: string) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], [field]: newValue };
    setButtons(newButtons);
    onChange(JSON.stringify({ ButtonParamsList: newButtons }));
  };

  const handleRemoveButton = (index: number) => {
    // Don't allow removing the Complete button (type 2)
    if (buttons[index].ButtonType === "2") {
      toast.warning("The Complete button cannot be removed");
      return;
    }
    const newButtons = buttons.filter((_, i) => i !== index);
    setButtons(newButtons);
    onChange(JSON.stringify({ ButtonParamsList: newButtons }));
  };

  return (
    <div className="space-y-4">
      {buttons.map((button, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">
              Button {button.ButtonType} ({button.Name || 'Unnamed'})
            </h3>
            {button.ButtonType !== "2" && (
              <button
                type="button"
                onClick={() => handleRemoveButton(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={button.Name}
                onChange={(e) => handleButtonChange(index, 'Name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}