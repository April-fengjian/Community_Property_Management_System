import { Calendar, momentLocalizer } from 'react-big-calendar'
import { message, Col, Row } from 'antd';
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import React, { useState, useEffect, useMemo } from 'react';
import { bookRoom, getReservations, cancelReservation } from '../utils/bookingUtils';
import party from '../resources/party.jpg';
import meeting from '../resources/meeting.jpg';
import dance from '../resources/dance.jpg';
import study from '../resources/study.jpg';
import coffee from '../resources/coffee.jpg';
import lounge from '../resources/lounge.jpg';


const localizer = momentLocalizer(moment) // or globalizeLocalizer

const resourceMap = [
  { resourceId: 92, resourceTitle: 'Party Room' },
  { resourceId: 93, resourceTitle: 'Meeting Room' },
  { resourceId: 94, resourceTitle: 'Lounge Room' },
  { resourceId: 95, resourceTitle: 'Coffee Room' },
  { resourceId: 96, resourceTitle: 'Dance Studio' },
  { resourceId: 97, resourceTitle: 'Study Room' },
]
const DragAndDropCalendar = withDragAndDrop(Calendar);

const RoomCalendar = () => {
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
    getReservations()
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
      message.success("all reservations are showed!");
    }).catch((err) => {
        message.error(err.message)
    })
    setLoading(false);
  }

  const onSelectSlot = async (range) => { 
    if (range.resourceId !== undefined) {
      const title = window.prompt('New reservation title')
      if (title) {
        const data = {
          "checkin_date_time": range.start,
          "checkout_date_time": range.end,
          "room": {
              "id": range.resourceId
          },
          "title": title
        }
        try {
          await bookRoom(data);
          message.success("Booked Successfully");
          await getData();
        } catch (error) {
          message.error(error.message);
        } 
      }
    }
  };
    // after selection range = a array of 
  //   {
  //     "start": "2022-11-01T14:30:00.000Z",
  //     "end": "2022-11-01T15:30:00.000Z",
  //     "resourceId": 3
  // }


const onSelectEvent = async (event) => {
    const confirm = window.confirm('Are you sure to cancel this reservation ？')
    if (confirm) {
      try {
        await cancelReservation(event.id);
        message.success("Canceled Successfully");
        await getData();
      } catch (error) {
        message.error(error.message);
      } 
    }
};

    return ( 
      <>  
        <Row className='main'>
          <Col span={8} className="left-side">
                <h1 id="center">
                  Rooms for Booking
                </h1>
            <Row> 
              <Col span={12}> 
                <img src={party} alt="Party Room" width="260" height="180" />
                <h1 id="left">
                  Party Room - Capacity : 40
                </h1>
                <img src={lounge} alt="Lounge" width="260" height="180" />
                <h1 id="left">
                  Lounge - Capacity : 10
                </h1>
                <img src={dance} alt="Dance Studio" width="260" height="180" />
                <h1 id="left">
                  Dance Studio - Capacity : 15
                </h1>
              </Col>
              <Col span={12}> 
                <img src={meeting} alt="Meeting Room" width="260" height="180" />
                <h1 id="left">
                  Meeting Room - Capacity : 8
                </h1>
                <img src={coffee} alt="Coffee Room" width="260" height="180" />
                <h1 id="left">
                  Coffee Room - Capacity : 8
                </h1>
                <img src={study} alt="Study Room" width="260" height="180" />
                <h1 id="left">
                  Study Room - Capacity : 4
                </h1>
              </Col>
            </Row>
          </Col>
          <Col span={16} className="right-side">
              <div className="myCustomHeight">
              <DragAndDropCalendar
                localizer={localizer}
                // views={allViews} //{['month','week', 'day']}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ minHeight: 650 }}
                selectable
                // onEventDrop={moveEvent}
                resizable
                resources={resourceMap}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
                defaultView="month"
                defaultDate={defaultDate}
                showMultiDayTimes
                onSelectSlot={onSelectSlot}
                onSelectEvent={onSelectEvent}
                min={moment('7:00', 'h:mm').toDate()}
                max={moment('22:00', 'h:mm').toDate()}
              />
            </div>
          </Col>
        </Row>
      </>
    )
}
export default RoomCalendar;


