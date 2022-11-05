import {
    Tabs,
  } from "antd";
  import React from "react";
  import PostAnnouncement from "./PostAnnouncement";
  import ServiceTasks from "./ServiceTasks";
  import PostMessage from './PostMessage';
  import RoomCalendar from "./RoomCalendar";
  import InvoiceList from "./InvoiceList";

   
  const { TabPane } = Tabs;  
    
  class ManagerHomePage extends React.Component {
    render() {
      return (
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}> 
          {/* <TabPane tab="ServiceTasks" key="1">
            <ServiceTasks />
          </TabPane> */}
          <TabPane tab="Post Announcement" key="2">
            <PostAnnouncement />
          </TabPane>
          <TabPane tab="Book Room" key="3">
            <RoomCalendar />
          </TabPane>
          <TabPane tab="Payment" key="4">
           <InvoiceList />
        </TabPane>
          <TabPane tab="Message Forum" key="5">
            <PostMessage />
          </TabPane>
        </Tabs>
      );
    }
  }
   
  export default ManagerHomePage;