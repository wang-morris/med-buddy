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
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dob ? new Date(dob) : null
  );

  useEffect(() => {
    if (clearCalendar) {
      setSelectedDate(null);
      setFormData((prev) => ({ ...prev, dob: '' }));
    }
  }, [clearCalendar, setFormData]);

  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
    setFormData((prev) => ({
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
