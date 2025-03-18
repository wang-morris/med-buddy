import { useEffect, useState } from 'react';
import './calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type CalendarProps = {
  dob: string;
  setFormData: (formData: any) => void;
  clearCalendar: boolean;
};

function Calendar({ dob, setFormData, clearCalendar }: CalendarProps) {
  // sets selected date as either the provided value or null if there is no date given
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dob ? new Date(dob) : null
  );

  /* clears the date if clearCalendar is true
     and updates formData to reset the dob field */
  useEffect(() => {
    if (clearCalendar) {
      setSelectedDate(null);
      setFormData((prev: { dob: string }) => ({ ...prev, dob: '' }));
    }
  }, [clearCalendar, setFormData]);

  /* handles date selection changes from the DatePicker
     and converts the date to YYYY-MM-DD format and updates formData */
  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
    setFormData((prev: { dob: string }) => ({
      ...prev,
      dob: date ? date.toISOString().split('T')[0] : '',
    }));
  }

  return (
    <div className="form-group">
      <div className="demographic-wrapper">
        <label htmlFor="dob">Date of Birth</label>
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Select Date"
            className="demographic-field date-picker-input"
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
