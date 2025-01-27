import { useState } from 'react';
import './toggle-bar.css';

function ToggleBar() {
  const [activeButton, setActiveButton] = useState('patient context');

  function handleButtonClick(button: string) {
    setActiveButton(button);
  }

  return (
    <div className="toggle-container">
      <button
        className={`toggle-item ${
          activeButton === 'patient context'
            ? 'active-toggle'
            : 'inactive-toggle'
        }`}
        onClick={() => handleButtonClick('patient context')}>
        Patient context
      </button>
      <button
        className={`toggle-item ${
          activeButton === 'ask a question'
            ? 'active-toggle'
            : 'inactive-toggle'
        }`}
        onClick={() => handleButtonClick('ask a question')}>
        Ask a question
      </button>
    </div>
  );
}

export default ToggleBar;
