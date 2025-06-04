import React from "react";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      className='
        ring-[1px] ring-slate-700 
        rounded-lg px-5 py-1 
        text-base text-gray-500 
        cursor-pointer 
        transition-all duration-200 
        hover:outline-none hover:ring-2 hover:ring-blue-500 hover:text-blue-500 
        focus:outline-none focus:ring-2 focus:ring-blue-500
      ' 
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;