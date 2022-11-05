import { message } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import React, { useState, useEffect, useMemo } from 'react';
import { getMyReservations } from '../utils/bookingUtils';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = () => {

  const [events, setEvents] = useState([]);  
  const [loading, setLoading] = useState(false);
  const defaultDate = useMemo(() => new Date(), [])
  useEffect(() => {
    getData();
  }, [])
  const getData = () => {
    if (loading) {
        return;
      }
    setLoading(true);
    getMyReservations()
    .then((response) => {
      var outputData = [];
      for(var i = 0; i < response.length; i++) {
          var oneReservation = response[i];
          var converted = {
          "start": new Date(moment.utc(oneReservation.checkin_date_time)),
          "end": new Date(moment.utc(oneReservation.checkout_date_time)),
          "resourceId": oneReservation.room.id,
          "id": oneReservation.id,
          "title": oneReservation.title}
          outputData.push(converted);
      }
      setEvents(outputData);
      message.success("all your reservations are showed!");
    }).catch((err) => {
        message.error(err.message)
    })
    setLoading(false);
  }
  return (
    <div className="myCalendarHeight">
    <DragAndDropCalendar
      localizer={localizer}
      views={['month']} //{['month','week', 'day']}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ Height: 350, Width : 820}}
      defaultView="month"
      defaultDate={defaultDate}
      showMultiDayTimes
    />
  </div>
  );
};
export default MyCalendar;
