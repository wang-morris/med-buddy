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
  // to test if the form data state is being saved correctly
  return <p>{JSON.stringify(formData)}</p>;
};

export default ChatContainer;
