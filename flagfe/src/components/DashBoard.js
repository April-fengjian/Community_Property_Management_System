import Announcement from "./Announcement";
import { Row, Col, Typography } from 'antd';
<<<<<<< Updated upstream

const { Text } = Typography;

=======
import MyCalendar from "./MyCalendar";
import { message, List } from 'antd';
import { getRequestByStatus } from "../utils/serviceUtils";
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
        const resp = await getRequestByStatus("processing")
        const title = []
        for (let i = 0; i< resp.length; i++) {
            title[i] = resp[i].title
                
        }
        this.setState({
            data: title,
        }); 
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
          header={<div>Your Request Status</div>}
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

>>>>>>> Stashed changes
const DashBoard = () => {
    return (
      <Row className='main'>
          <Col span={12} className="left-side">
              <h1 id="center"> Announcement </h1>
              <Announcement />
          </Col>
<<<<<<< Updated upstream
          <Col span={12} className="right-side">
          <div>calendar</div>
          <div>Service request</div>
=======
          <Col span={12} className="right-side" id="high">
            <Row span={8} style={{height:"50%"}}>
          <MyCalendar />
          </Row>
           <Row span={16} style={{height:"50%"}}>
          <ShowRequest />
          </Row>
>>>>>>> Stashed changes
          </Col>
      </Row>
    )
  }
   
  export default DashBoard;