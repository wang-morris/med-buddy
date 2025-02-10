import { useState } from 'react';
import './toggle-bar.css';

interface ToggleBarProps {
  setActiveComponent: (component: string) => void;
}

function ToggleBar({ setActiveComponent }: ToggleBarProps) {
  const [activeButton, setActiveButton] = useState('patient context');

  function getClassName(button: string) {
    return activeButton === button ? 'active-toggle' : 'inactive-toggle';
  }

  function handleButtonClick(button: string) {
    setActiveButton(button);
    setActiveComponent(button);
  }

  return (
    <div className="toggle-container">
      <button
        className={`toggle-item ${getClassName('patient context')}`}
        onClick={() => handleButtonClick('patient context')}>
        Patient context
      </button>
      <button
        className={`toggle-item ${getClassName('ask a question')}`}
        onClick={() => handleButtonClick('ask a question')}>
        Ask a question
      </button>
    </div>
  );
}

export default ToggleBar;
