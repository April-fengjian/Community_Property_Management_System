import Announcement from "./Announcement";
import { Row, Col, Typography } from 'antd';
import MyCalendar from "./MyCalendar";
import { message, List } from 'antd';
import { getMyRequestByStatus } from "../utils/serviceUtils";
import React from "react";

const { Text } = Typography;

class ShowRequest extends React.Component{
  state = {
    loading: false,
    data : []
  }
  componentDidMount() {
    this.loadData();
  } 
  
  loadData = async () => {
    this.setState({
        loading: true,
    });

    try {
        const resp = await getMyRequestByStatus("processing")
        const title = []
        for (let i = 0; i< resp.length; i++) {
            title[i] = resp[i].title
                
        }
        this.setState({
            data: title,
        }); 
        message.success("all your service requests are showed!");
    } catch (error) {
        message.error(error.message);
    } finally {
        this.setState({
            loading: false,
        });
    }
  };

  render(){
    return (
      <div style={{height: '300px',width: '100%', marginTop:'30px', overflow: 'scroll'}}>
        <List
          header={<div align="center">Your Request Status</div>}
          bordered
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[processing]</Typography.Text> Your request <Typography.Text underline>{item}</Typography.Text> is now processing!
            </List.Item>
          )}
        />
      </div>
    )
  }
}

const DashBoard = () => {
    return (
      <div>
        <Row className='main'>
          <Col span={12} className="left-side">
              <h1 id="center"> Announcement </h1>
              <Announcement />
          </Col>
          <Col span={12} className="right-side" id="high">
            <Row span={8} style={{height:"50%"}}>
          <MyCalendar />
          </Row>
           <Row span={16} style={{height:"50%"}}>
          <ShowRequest />
          </Row>
          </Col>
        </Row>
      </div>
      
    )
  }
   
  export default DashBoard;