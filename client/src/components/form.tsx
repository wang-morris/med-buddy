import { useState } from 'react';
import './form.css';
import Calendar from './calendar';

type FormProps = {
  formData: {
    sex: string;
    dob: string;
    height: { feet: string; inches: string };
    weight: string;
    ethnicity: string;
    additionalInfo: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<FormProps['formData']>>;
};

function Form({ formData, setFormData }: FormProps) {
  const [clearCalendar, setClearCalendar] = useState(false);

  function clearForm() {
    setFormData({
      sex: '',
      dob: '',
      height: { feet: '', inches: '' },
      weight: '',
      ethnicity: '',
      additionalInfo: '',
    });
    setClearCalendar(true);
    setTimeout(() => setClearCalendar(false), 10);
  }

  return (
    <div>
      <form className="app-form">
        <div className="form-group">
          <div className="demographic-wrapper">
            <label htmlFor="sex">Sex</label>
            <select
              className="demographic-field"
              value={formData.sex}
              onChange={(e) =>
                setFormData({ ...formData, sex: e.target.value })
              }
              id="sex"
              name="sex">
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <Calendar
          dob={formData.dob}
          setFormData={setFormData}
          clearCalendar={clearCalendar}
        />
        <div className="form-group">
          <div className="demographic-wrapper">
            <label htmlFor="height">Height</label>
            <div className="height-selection">
              <input
                value={formData.height.feet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: { ...formData.height, feet: e.target.value },
                  })
                }
                className="demographic-field"
                type="text"
                id="feet"
                name="feet"
                placeholder="0"
              />
              <span>ft</span>
              <input
                value={formData.height.inches}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: { ...formData.height, inches: e.target.value },
                  })
                }
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
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
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
            <select
              value={formData.ethnicity}
              onChange={(e) =>
                setFormData({ ...formData, ethnicity: e.target.value })
              }
              className="demographic-field"
              id="ethnicity"
              name="ethnicity">
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
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({ ...formData, additionalInfo: e.target.value })
            }
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
    </div>
  );
}

export default Form;
