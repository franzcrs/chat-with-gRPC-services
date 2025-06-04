import { useState } from 'react';
import { RiRobot2Line, RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BiSolidLeftArrow } from "react-icons/bi";
import CustomScrollableContainer from './components/CustomScrollableContainer';
import InputBox from './components/InputBox';
import ActionButton from './components/ActionButton';

interface ChatMessage {
  sender: "bot" | "user";
  message: string;
}

function App() {
  const [inputQuery, setInputQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: "bot", message: "Welcome to the bot chat. Chat with me!" },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim() === '') return; // Prevent sending empty messages
    // Add the user message to the chat history
    setChatHistory(prev => [...prev, { sender: "user", message: inputQuery }]);
    // Simulate a bot response (you can replace this with actual bot logic)
    setChatHistory(prev => [...prev, { sender: "bot", message: `You said: ${inputQuery}` }]);
    // Clear the input field
    setInputQuery('');
  };

  // Placeholder functions for action buttons
  const actionOne = () => {
  }
  const actionTwo = () => {
  }
            
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 from-20% to-gray-950 flex flex-col">
      {/* Define workspace dimension and paddings */}
      <div className="h-svh py-14 px-8 text-center">
        {/* Responsive chat container */}
        <div className='max-w-lg mx-auto h-full border-[1px] rounded-2xl border-gray-500 bg-zinc-800/60 overflow-visible flex flex-col'>
          {/* Header */}
          <div className="rounded-t-2xl text-xl text-gray-500 flex space-x-4 items-center p-5 pb-4 bg-zinc-900/60">
            <RiRobot2Line className="text-4xl ml-2 text-slate-600 flex-none" />
            <div className='flex flex-col items-start'>
              <code>This is my app</code>
              <code className='text-sm'>Description</code>
            </div>
          </div>
          {/* Chat space */}
          <CustomScrollableContainer className='flex-1 overflow-y-scroll p-5 pr-3 pb-3 space-y-5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex-col justify-end'>
            {chatHistory.map(({ sender, message }, index) => (
              /* Message bubble */
              <div
                key={index}
                className={`border-0 border-gray-400 rounded-lg flex ${ (sender == "bot") ? 'flex-row' : 'flex-row-reverse' } items-start`}
              >
                <div className="flex-none w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl text-gray-300">
                  {sender === "bot" ? (
                    <RiRobot2Fill />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className='flex-none w-3 h-10 flex items-center justify-center overflow-hidden'>
                  <BiSolidLeftArrow size={'20'} className={`flex-none pl-[5px] text-slate-700 ${ (sender == "bot") ? '' : 'rotate-180' } `}/>
                </div>
                <div className="rounded-lg p-3 bg-slate-700 text-sm text-gray-200 max-w-[70%] text-start text-wrap break-words whitespace-pre-wrap">
                  {`${message}`}
                </div>
              </div>
            ))}
          </CustomScrollableContainer>
          {/* Input area */}
          <div className='border-t border-gray-800/60 bg-zinc-800/10 px-7 pt-5 pb-2 space-y-[18px]'>
            {/* Actions space */}
            <div className='flex justify-start items-center space-x-4'>
              <ActionButton onClick={actionOne}>
                Action 1
              </ActionButton>
              <ActionButton onClick={actionTwo}>
                Action 2
              </ActionButton>
            </div>
            <InputBox
              imputQuery={inputQuery}
              onInputChange={setInputQuery}
              onSubmit={handleSend}
            />
            <p className="text-xs text-gray-600">
              <code>
                © 2025 Franz Chuquirachi. All rights reserved.
              </code>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
