import { useState, useEffect } from 'react';
import './App.css';
import ToggleBar from './components/toggle-bar';
import Form from './components/form';
import ChatContainer from './components/chat';

export default function App() {
  const [activeComponent, setActiveComponent] = useState('patient context');
  const [formData, setFormData] = useState({
    sex: '',
    dob: '',
    height: { feet: '', inches: '' },
    weight: '',
    ethnicity: '',
    additionalInfo: '',
  });

  const [shouldResetChat, setShouldResetChat] = useState(false);

  useEffect(() => {
    setShouldResetChat(true);
  }, [formData]);

  return (
    <>
      <header>
        <h1>MedBuddy</h1>
      </header>
      <ToggleBar setActiveComponent={setActiveComponent} />
      {activeComponent === 'patient context' ? (
        <Form formData={formData} setFormData={setFormData} />
      ) : (
        <ChatContainer
          shouldResetChat={shouldResetChat}
          setShouldResetChat={setShouldResetChat}
          formData={formData}
        />
      )}
      <div
        className={`footer ${
          activeComponent === 'ask a question' ? 'hidden' : ''
        }`}>
        <p className="disclaimer">
          CAUTION: MedBuddy is not intended to replace the medical expertise of
          a licensed healthcare professional. This form is for informational
          purposes only and does not store identifiable patient data.
        </p>
      </div>
    </>
  );
}
