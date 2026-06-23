'use client';

import { useState, useRef, useEffect } from 'react';
import { CHATBOT_RULES } from '@/data/chatbotRules';
import styles from './Chatbot.module.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // State 1: Conversation History
  // We start by injecting the first bot message
  const [messages, setMessages] = useState([
    { sender: 'bot', text: CHATBOT_RULES['start'].message }
  ]);
  
  // State 2: Current Options to display
  const [currentOptions, setCurrentOptions] = useState(CHATBOT_RULES['start'].options);

  // Reference to auto-scroll the chat
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  // This is the core logic: What happens when a user clicks a button?
  const handleOptionClick = (option) => {
    // 1. Add the user's choice to the chat history
    const userMessage = { sender: 'user', text: option.label };
    
    // 2. Find the bot's response using the "next" key
    const nextNode = CHATBOT_RULES[option.next];
    const botMessage = { sender: 'bot', text: nextNode.message };
    
    // 3. Update the state with both new messages
    setMessages((prev) => [...prev, userMessage, botMessage]);
    
    // 4. Update the buttons to the next set of options
    setCurrentOptions(nextNode.options);
  };

  return (
    <div className={styles.chatbotWrapper}>
      {/* The Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span className={styles.headerTitle}>Assistant</span>
            <button onClick={toggleChat} className={styles.closeBtn} aria-label="Close chat">×</button>
          </div>
          
          <div className={styles.chatBody} ref={chatBodyRef}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`${styles.message} ${msg.sender === 'bot' ? styles.messageBot : styles.messageUser}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className={styles.chatOptions}>
            {currentOptions.map((opt, idx) => (
              <button 
                key={idx} 
                onClick={() => handleOptionClick(opt)}
                className={styles.optionBtn}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* The Floating Trigger Button */}
      <button onClick={toggleChat} className={styles.triggerBtn} aria-label="Toggle chat">
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
    </div>
  );
}
