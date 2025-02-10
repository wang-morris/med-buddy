import { useState } from 'react';
import './form.css';
import Calendar from './calendar';

const Form: React.FC = () => {
  const [clearCalendar, setClearCalendar] = useState(false);

  function clearForm() {
    setClearCalendar(true);
    setTimeout(() => setClearCalendar(false), 10);
  }

  return (
    <form className="app-form">
      <div className="form-group">
        <div className="demographic-wrapper">
          <label htmlFor="sex">Sex</label>
          <select className="demographic-field" id="sex" name="sex">
            <option value="">Select sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <Calendar clearCalendar={clearCalendar} />
      <div className="form-group">
        <div className="demographic-wrapper">
          <label htmlFor="height">Height</label>
          <div className="height-selection">
            <input
              className="demographic-field"
              type="text"
              id="feet"
              name="feet"
              placeholder="0"
            />
            <span>ft</span>
            <input
              className="demographic-field"
              type="text"
              id="inches"
              name="inches"
              placeholder="0"
            />
            <span>in</span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="demographic-wrapper">
          <label form="weight">Weight</label>
          <div className="weight-select">
            <input
              className="demographic-field"
              type="weight"
              id="weight"
              name="weight"
              placeholder="0.0"
            />
            <span>lbs</span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="demographic-wrapper">
          <label htmlFor="ethnicity">Ethnicity</label>
          <select className="demographic-field" id="ethnicity" name="ethnicity">
            <option value="">Select Ethnicity</option>
            <option value="White">White</option>
            <option value="Hispanic or Latino">Hispanic or Latino</option>
            <option value="Black or African American">
              Black or African American
            </option>
            <option value="Asian">Asian</option>
            <option value="Pacific Islander">Pacific Islander</option>
            <option value="Native American or Alaska Native">
              Native American or Alaska Native
            </option>
            <option value="White">Middle Eastern</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="form-textbox-container">
        <textarea
          className="form-textbox"
          id="textbox-id"
          name="textbox-name"
          placeholder="Provide more details such as pre-existing conditions, medications, allergies, or physical and mental disabilities"
        />
      </div>
      <button type="reset" className="clear-button" onClick={clearForm}>
        Clear Form
      </button>
    </form>
  );
};

export default Form;
