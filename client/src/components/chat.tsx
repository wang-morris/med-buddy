import { useEffect, useRef, useState } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { fetchMockApiResponse } from '../mockApi';

interface Message {
  userMessage: string;
  mockResponse: any;
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

    try {
      const mockData = await fetchMockApiResponse();

      const responseContext = {
        userMessage,
        mockResponse: mockData,
      };

      const updatedMessages = [...messages, responseContext];
      setMessages(updatedMessages);
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

      setMessages([...messages, responseContext]);
      setUserMessage('');
    } catch (error) {
      console.error('Error fetching mock data:', error);
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
            <p className="user-message">
              <strong>User:</strong> {msg.userMessage}
            </p>
            <p className="chatbot-message">
              <strong>Mock Response:</strong> {msg.mockResponse.title}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <footer className="chat-textbox-container">
        <textarea
          className="chat-textbox"
          id="textbox-id"
          name="textbox-name"
          placeholder="Ask a medical question..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}></textarea>
      </footer>
      <div className="send-button-container">
        <button className="send-button">
          <FontAwesomeIcon icon={faCircleArrowUp} onClick={handleSendMessage} />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
