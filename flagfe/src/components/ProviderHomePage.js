import {
    Tabs,
  } from "antd";
  import React from "react";
  import ServiceTasks from "./ServiceTasks";
  import PostMessage from './PostMessage';
  import RoomCalendar from "./RoomCalendar";

   
  const { TabPane } = Tabs;  
    
  class ProviderHomePage extends React.Component {
    render() {
      return (
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}> 
          <TabPane tab="ServiceTasks" key="1">
            <ServiceTasks />
          </TabPane>
          {/* <TabPane tab="this is provider" key="2">
            
          </TabPane>
          <TabPane tab="Book Room" key="3">
            <RoomCalendar />
          </TabPane>
          <TabPane tab="Message Forum" key="5">
            <PostMessage />
          </TabPane> */}
        </Tabs>
      );
    }
  }
   
  export default ProviderHomePage;