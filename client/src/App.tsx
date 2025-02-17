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

  useEffect(() => {
    console.log('Current formData:', formData);
  }, [formData]);

  useEffect(() => {
    async function readServerData() {
      try {
        const resp = await fetch('/api/hello');
        const data = await resp.json();

        console.log('Data from server:', data);
      } catch (error) {
        console.error('Error fetching server data:', error);
      }
    }
    readServerData();
  }, []);

  return (
    <>
      <header>
        <h1>MedBuddy</h1>
      </header>
      <ToggleBar setActiveComponent={setActiveComponent} />
      {activeComponent === 'patient context' ? (
        <Form formData={formData} setFormData={setFormData} />
      ) : (
        <ChatContainer formData={formData} />
      )}
      <div className="footer">
        <p>
          CAUTION: MedBuddy provides recommendations based on peer-reviewed data
          and other reputable sources but is not intended to replace the medical
          expertise of a licensed healthcare professional.
        </p>
      </div>
    </>
  );
}
