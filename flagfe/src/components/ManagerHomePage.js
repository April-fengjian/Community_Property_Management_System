import {
    Tabs,
  } from "antd";
  import React from "react";
  import ManagerStayPage from "./BookRoom_Manager";
  import PostAnnouncement from "./PostAnnouncement";
  import ServiceTasks from "./ServiceTasks";
  import PostMessage from './PostMessage';

   
  const { TabPane } = Tabs;  
    
  class ManagerHomePage extends React.Component {
    render() {
      return (
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}> 
          <TabPane tab="ServiceTasks" key="1">
            <ServiceTasks />
          </TabPane>
          <TabPane tab="Post Announcement" key="2">
            <PostAnnouncement />
          </TabPane>
          <TabPane tab="Stay upload" key="3">
            <ManagerStayPage />
          </TabPane>
          <TabPane tab="Message Forum" key="5">
            <PostMessage />
          </TabPane>
        </Tabs>
      );
    }
  }
   
  export default ManagerHomePage;