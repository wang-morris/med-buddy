import './chat.css';

const ChatContainer = () => {
  return (
    <footer className="chat-textbox-container">
      <textarea
        className="chat-textbox"
        id="textbox-id"
        name="textbox-name"
        placeholder="Ask a medical question..."></textarea>
    </footer>
  );
};

export default ChatContainer;
