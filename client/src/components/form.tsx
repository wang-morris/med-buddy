import './form.css';

const Form: React.FC = () => {
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
      <div className="form-group">
        <div className="demographic-wrapper">
          <label htmlFor="dob">Date of Birth</label>
          <div className="date-selection">
            <select id="month" name="month" className="demographic-field">
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <input
              className="demographic-field"
              type="text"
              id="day"
              name="day"
              placeholder="Day"
            />
            <input
              className="demographic-field"
              type="text"
              id="year"
              name="year"
              placeholder="Year"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="demographic-wrapper">
          <label htmlFor="height">Height</label>
          <div className="height-selection">
            <input
              className="demographic-field"
              type="text"
              id="feet"
              name="feet"
              placeholder="Feet"
            />
            <span>ft</span>
            <input
              className="demographic-field"
              type="text"
              id="inches"
              name="inches"
              placeholder="Inches"
            />
            <span>in</span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="demographic-wrapper">
          <label form="weight">Weight</label>
          <input
            className="demographic-field"
            type="weight"
            id="weight"
            name="weight"
            placeholder="Enter Weight"
          />
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
      <button type="reset" className="clear-button">
        Clear Form
      </button>
    </form>
  );
};

export default Form;
