import { useEffect, useRef, useState } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { fetchOpenAiResponse } from '../api/openAiApi';

interface Message {
  userMessage: string;
  aiResponse: string;
}

interface ChatContainerProps {
  shouldResetChat: boolean;
  setShouldResetChat: (value: boolean) => void;
}

const ChatContainer = ({
  shouldResetChat,
  setShouldResetChat,
}: ChatContainerProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [userMessage, setUserMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage: Message = {
      userMessage,
      aiResponse: 'Thinking...',
    };

    setMessages([...messages, newMessage]);
    setUserMessage('');

    const textarea = document.querySelector(
      '.chat-textbox'
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.blur();
    }

    try {
      const aiResponse = await fetchOpenAiResponse(userMessage);

      const updatedMessages = [...messages, { ...newMessage, aiResponse }];
      setMessages(updatedMessages);

      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (shouldResetChat) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
      setShouldResetChat(false);
    }
  }, [shouldResetChat, setShouldResetChat]);

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <p className="user-message">{msg.userMessage}</p>
            <p className="chatbot-message">{msg.aiResponse}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <footer className="chat-textbox-container">
        <textarea
          className="chat-textbox"
          placeholder="Ask a medical question..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </footer>
      <div className="send-button-container">
        <button className="send-button" onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faCircleArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
