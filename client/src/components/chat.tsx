import { useEffect, useRef, useState } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { fetchOpenAiResponse } from '../api/openAiApi';
import ReactMarkdown from 'react-markdown';

interface Message {
  userMessage: string;
  aiResponse: string;
}

interface ChatContainerProps {
  shouldResetChat: boolean;
  setShouldResetChat: (value: boolean) => void;
  formData: {
    sex: string;
    dob: string;
    height: { feet: string; inches: string };
    weight: string;
    ethnicity: string;
    additionalInfo: string;
  };
}

const ChatContainer = ({
  shouldResetChat,
  setShouldResetChat,
  formData,
}: ChatContainerProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [userMessage, setUserMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const patientContext = `
      Sex: ${formData.sex},
      DOB: ${formData.dob},
      Height: ${formData.height.feet}'${formData.height.inches}",
      Weight: ${formData.weight} lbs,
      Ethnicity: ${formData.ethnicity},
      Additional Info: ${formData.additionalInfo}
    `;

    console.log('API request patient context', patientContext);

    const newMessage: Message = {
      userMessage,
      aiResponse: 'Generating response...',
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
      const aiResponse = await fetchOpenAiResponse(userMessage, patientContext);

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
            <p className="chatbot-message">
              <ReactMarkdown>{msg.aiResponse}</ReactMarkdown>
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <footer className="chat-textbox-container">
        <textarea
          className="chat-textbox"
          placeholder="Ask a question related the patient..."
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
