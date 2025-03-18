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
  // Load chat history from localStorage, or start empty
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [userMessage, setUserMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* Sends userMessage to openAI API and updates chart log
    Prevents empty messages from being sent */
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Allows patient context to used in AI prompt
    const patientContext = `
      Sex: ${formData.sex},
      DOB: ${formData.dob},
      Height: ${formData.height.feet}'${formData.height.inches}",
      Weight: ${formData.weight} lbs,
      Ethnicity: ${formData.ethnicity},
      Additional Info: ${formData.additionalInfo}
    `;

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

      // store chat data in localStorage
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }
  };

  // scrolls to the most recent message in case user leaves view or reloads the page
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  // clears messages from state and localStorage if formData is changed in App.tsx
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
              <ReactMarkdown children={msg.aiResponse} />
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
