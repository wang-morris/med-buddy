import { useState } from 'react';
import './toggle-bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

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
        <span className="left-arrow">
          <FontAwesomeIcon icon={faAngleLeft} />
        </span>
        Patient Context
      </button>
      <button
        className={`toggle-item ${getClassName('ask a question')}`}
        onClick={() => handleButtonClick('ask a question')}>
        Ask a Question
        <span className="right-arrow">
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      </button>
    </div>
  );
}

export default ToggleBar;
