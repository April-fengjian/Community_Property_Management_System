import React from "react";
import {
  Tabs,
} from "antd";
import DashBoard from './DashBoard';
import ServiceRequest from './ServiceRequest';
import BookRoom from './BookRoom';
import Payment from './Payment';
import Message from './Message';
import PostMessage from './PostMessage';
 
const { TabPane } = Tabs;
  
class TenantHomePage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="DashBoard" key="1">
            <DashBoard />
        </TabPane>
        <TabPane tab="Service Request" key="2">
            <ServiceRequest />
        </TabPane>
        <TabPane tab="Book Room" key="3">
            <BookRoom />
        </TabPane>
        <TabPane tab="Payment" key="4">
            <Payment />
        </TabPane>
        <TabPane tab="Message Forum" key="5">
            <PostMessage />
        </TabPane>
      </Tabs>
    );
  }
}
 
export default TenantHomePage;