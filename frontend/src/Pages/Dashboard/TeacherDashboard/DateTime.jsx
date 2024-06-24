import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, format } from 'date-fns';

const DateTime = ({setDate, allowedDays}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const isAllowedDate = (date) => {
    // Check if the date's day is in the allowedDays array
    return allowedDays.some((allowedDay) => allowedDay.day === date.getDay());
  };

  const isAllowedTime = (date) => {
    const allowedDay = allowedDays.find((day) => day.day === date.getDay());
    if (!allowedDay) return false;

    const minutes = date.getHours() * 60 + date.getMinutes();
    return minutes >= allowedDay.starttime && minutes <= allowedDay.endtime - 60;
  };

  const filterTime = (time) => {
    return isAllowedTime(time);
  };

  useEffect(() => {
    if (selectedDate) {
        const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
        // console.log('Selected Date and Time:', formattedDate.slice(0,19)+'Z');
        setDate(formattedDate.slice(0,19)+'Z');
    }
  }, [selectedDate]);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        filterDate={isAllowedDate}
        showTimeSelect
        timeIntervals={15}
        timeFormat="HH:mm"
        minTime={setHours(setMinutes(new Date(), 0), 0)}
        maxTime={setHours(setMinutes(new Date(), 0), 23)}
        filterTime={filterTime}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select a date and time"
      />
    </>
  );
};

export default DateTime;
