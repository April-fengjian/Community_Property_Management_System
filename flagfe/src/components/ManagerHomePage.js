import {
    Tabs,
  } from "antd";
  import React from "react";
  import PostAnnouncement from "./PostAnnouncement";
  import ServiceTasks from "./ServiceTasks";
   
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
        </Tabs>
      );
    }
  }
   
  export default ManagerHomePage;