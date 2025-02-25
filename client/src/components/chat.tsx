import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

const ChatContainer = () => {
  return (
    <div>
      <footer className="chat-textbox-container">
        <textarea
          className="chat-textbox"
          id="textbox-id"
          name="textbox-name"
          placeholder="Ask a medical question..."></textarea>
      </footer>
      <div className="send-button-container">
        <button className="send-button">
          <FontAwesomeIcon icon={faCircleArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
