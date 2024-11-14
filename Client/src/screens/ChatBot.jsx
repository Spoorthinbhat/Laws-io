import { Bot, RotateCcw, Send, Sparkles, User } from 'lucide-react';
import React, { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your AI assistant. How can I help you today?", 
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle sending message to the backend (API call)
  const sendMessageToBackend = async (message) => {
    try {
        console.log(message);
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "text": message }),
      });

      const data = await response.json();

      if (data.dialogAction.fulfillmentState === 'Fulfilled') {
        // Bot response received successfully
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: data.dialogAction.message.content,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: "I'm having trouble answering that. Please try again later.",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ]);
      }
    } catch (error) {
      console.error('Error sending message to backend:', error);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: "There was an issue with the connection. Please try again.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  };

  // Handle sending new message
  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: newMessage,
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setNewMessage("");
      setIsTyping(true);
      
      // Simulate bot typing delay before responding
      setTimeout(() => {
        setIsTyping(false);
        sendMessageToBackend(newMessage);  // Call the backend with the new message
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <h1 className="text-xl font-semibold">AI Assistant</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl h-full mx-auto flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start max-w-[80%] gap-3">
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                      <Bot size={18} />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-4 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white shadow-sm border border-gray-100'}`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                    <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {message.timestamp}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                      <User size={18} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <Bot size={18} />
                <span className="text-sm">AI is typing...</span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message AI assistant..."
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
