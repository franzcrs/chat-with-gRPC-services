/**
 * Filename: InputBox.tsx
 * Author: Franz Chuquirachi
 * Created: 2024-12-16
 * Copyright © 2024 Franz Arthur Chuquirachi Rosales. All rights reserved.
 */

import React from 'react';
import { Search, SendHorizontal } from 'lucide-react'; // Typical search icon

/**
 * Props for the InputBox component.
 * 
 * @property imputQuery - The current input string.
 * @property onInputChange - Callback function to handle changes of the input query.
 * @property onSubmit - Callback function to handle form submission.
*/
interface InputBoxProps {
  imputQuery: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * A reusable input box component with a submit button, typically used for sending search queries or messages.
 *
 * @param imputQuery - The current value of the input field.
 * @param onInputChange - Callback invoked when the input value changes. Receives the new value as an argument.
 * @param onSubmit - Callback invoked when the form is submitted. Handles the submission event.
 *
 * @returns A JSX form element containing a styled text input and a submit button.
 */
const InputBox = ({ imputQuery, onInputChange, onSubmit }: InputBoxProps) => {
  return (
    <form id="search-form" onSubmit={onSubmit} className="relative">
      <input
        type="text"
        value={imputQuery}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type your message ..."
        className="w-full pl-5 pr-12 py-3 rounded-full bg-slate-700 text-base text-gray-200/80 placeholder-gray-400 text-start  whitespace-pre-wrap transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rounded-sm hover:text-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <SendHorizontal size={24} />
      </button>
    </form>
  );
};

export default InputBox;