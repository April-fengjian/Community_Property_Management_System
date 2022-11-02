import { Calendar } from 'antd';
import React from 'react';
const MyCalendar = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <div className="site-calendar-demo-card" style={{backgroundColor:'transparent'}}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} style={{backgroundColor:'transparent'}} />
    </div>
  );
};
export default MyCalendar;
