import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface ButtonParams {
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

interface ButtonConfigProps {
  buttons: ButtonParams[];
  onChange: (buttons: ButtonParams[]) => void;
  isExtra?: boolean;
}

export function ButtonConfig({ buttons = [], onChange, isExtra = false }: ButtonConfigProps) {
  const [newButtonName, setNewButtonName] = useState("");
  const [newButtonStatus, setNewButtonStatus] = useState("");

  const handleNameChange = (index: number, name: string) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], Name: name };
    onChange(newButtons);
  };

  const handleStatusChange = (index: number, status: string) => {
    const newButtons = [...buttons];
    newButtons[index] = { 
      ...newButtons[index], 
      ButtonUserStatus: status,
      MessageText: status 
    };
    onChange(newButtons);
  };

  const handleAddButton = () => {
    if (!newButtonName.trim()) {
      toast.error('Please enter a button name');
      return;
    }
    if (isExtra && !newButtonStatus.trim()) {
      toast.error('Please enter a user status');
      return;
    }
    const newButton = {
      Name: newButtonName,
      ApiCall: "",
      ShowForm: "True",
      ShowList: isExtra ? "True" : "False",
      UseButton: "True",
      ButtonType: isExtra ? "4" : String(buttons.length),
      ShowAlways: "False",
      UseMessage: "False",
      MessageText: isExtra ? newButtonStatus : "",
      ButtonUserStatus: isExtra ? newButtonStatus : "",
    };
    onChange([...buttons, newButton]);
    setNewButtonName("");
    setNewButtonStatus("");
  };

  return (
    <div className="space-y-4">
      {buttons.map((button, index) => (
        <div key={button.ButtonType} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              {button.Name || `Standard Button Type: ${button.ButtonType}`}
            </span>
            {(isExtra || button.ButtonType !== '2') && (
              <button
                type="button"
                onClick={() => {
                  const newButtons = buttons.filter((_, i) => i !== index);
                  onChange(newButtons);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={button.Name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder="Button name"
              className="w-full px-3 py-2 border rounded-md"
            />
            {isExtra && (
              <input
                type="text"
                value={button.ButtonUserStatus}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                placeholder="User status"
                className="w-full px-3 py-2 border rounded-md"
              />
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <input
          type="text"
          value={newButtonName}
          onChange={(e) => setNewButtonName(e.target.value)}
          placeholder="Enter new button name"
          className="flex-1 px-3 py-2 border rounded-md"
        />
        {isExtra && (
          <input
            type="text"
            value={newButtonStatus}
            onChange={(e) => setNewButtonStatus(e.target.value)}
            placeholder="Enter user status"
            className="flex-1 px-3 py-2 border rounded-md"
          />
        )}
        <button
          type="button"
          onClick={handleAddButton}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Button
        </button>
      </div>
    </div>
  );
}