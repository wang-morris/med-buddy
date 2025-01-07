import { useEffect } from 'react';
import './App.css';

export default function App() {
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
      <div className="toggle-container">
        <label className="toggle-item">Patient context</label>
        <label className="toggle-item">Ask a question</label>
      </div>
      <form className="app-form">
        <div className="form-group">
          <label form="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label form="email">Age:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label form="message">Date of Birth:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"></textarea>
        </div>
        <button type="submit" className="submit-button">
          Clear Form
        </button>
      </form>
    </>
  );
}
