import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import Sidebar from '../components/sidebar';

const CalendarPage = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Calendar</h1>
        <Calendar
        //@ts-ignore
          onChange={setValue}
          value={value}
          className="rounded-lg shadow-md"
        />
        <p className="mt-4">
          You selected: {value ? value.toDateString() : 'No date selected'}
        </p>
      </div>
    </div>
  );
};

export default CalendarPage;
