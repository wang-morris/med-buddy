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
        <button className="toggle-item">Patient context</button>
        <button className="toggle-item">Ask a question</button>
      </div>
      <form className="app-form">
        <div className="form-group">
          <label htmlFor="sex">Sex</label>
          <select className="demographic-field" id="sex" name="sex">
            <option value="">Select sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <div className="date-selection">
            <select id="day" name="day" className="demographic-field">
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

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

            <select id="year" name="year" className="demographic-field">
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <div className="height-selection">
            {/* Feet Dropdown */}
            <select id="feet" name="feet" className="demographic-field">
              <option value="">Feet</option>
              {Array.from({ length: 7 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Inches Dropdown */}
            <select id="inches" name="inches" className="demographic-field">
              <option value="">Inches</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label form="weight">Weight</label>
          <input
            className="demographic-field"
            type="weight"
            id="weight"
            name="weight"
            placeholder="Enter Weight"
          />
          <span className="pounds">lbs</span>
        </div>
        <div className="form-group">
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
        <button type="reset" className="clear-button">
          Clear Form
        </button>
      </form>
    </>
  );
}
