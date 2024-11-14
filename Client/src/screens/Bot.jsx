import { Bot, X } from 'lucide-react';
import React, { useState } from 'react';
import ChatInterface from './ChatBot';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
          
          {/* Chat Interface */}
          <div className="h-full">
            <ChatInterface />
          </div>
        </div>
      )}

      {/* Floating Bot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg 
                 flex items-center justify-center hover:shadow-xl transition-shadow
                 animate-bounce-gentle focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Bot size={24} />
      </button>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingChatBot;