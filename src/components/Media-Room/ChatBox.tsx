import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';

interface ChatMessage {
  type: 'message' | 'system';
  message: string;
  sender: string;
  senderId?: string;
  timestamp: number;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onSendReaction: (reaction: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage, onSendReaction }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '👏'];
  
  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-message ${msg.type === 'system' ? 'system-message' : ''}`}
          >
            <span className="message-sender">{msg.sender}</span>
            <span className="message-text">{msg.message}</span>
            <span className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="reactions-bar">
        {reactions.map(reaction => (
          <button 
            key={reaction} 
            className="reaction-button"
            onClick={() => onSendReaction(reaction)}
          >
            {reaction}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;