import './chat.css';

type ChatProps = {
  formData: {
    sex: string;
    dob: string;
    height: { feet: string; inches: string };
    weight: string;
    ethnicity: string;
    additionalInfo: string;
  };
};

const ChatContainer = ({ formData }: ChatProps) => {
  return (
    <footer className="chat-textbox-container">
      <textarea
      className="chat-textbox"
      id="textbox-id"
      name="textbox-name"
      placeholder="Ask a medical question about the patient...">
      </textarea>
    </footer>
  )
};

export default ChatContainer;
