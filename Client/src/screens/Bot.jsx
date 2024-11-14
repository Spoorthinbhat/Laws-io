import { Bot, X } from 'lucide-react';
import React, { useState } from 'react';
import ChatInterface from './ChatBot';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
      >
        {isOpen ? (
          <X size={24} className="animate-in fade-in duration-200" />
        ) : (
          <Bot size={24} className="animate-in fade-in duration-200" />
        )}
      </button>

      {/* Chat Interface Modal */}
      {isOpen && (
        <div className="fixed bottom-24 overflow-y-auto right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200  animate-in slide-in-from-bottom duration-300 z-40">
          <ChatInterface />
        </div>
      )}
    </>
  );
};

export default ChatButton;