import { useEffect, useState } from 'react';
import './calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar({ clearCalendar }: { clearCalendar: boolean }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (clearCalendar) {
      setSelectedDate(null);
    }
  }, [clearCalendar]);

  return (
    <div className="form-group">
      <div className="demographic-wrapper">
        <label htmlFor="dob">Date of Birth</label>
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
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
