import Announcement from "./Announcement";
import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

const DashBoard = () => {
    return (
      <Row className='main'>
          <Col span={12} className="left-side">
              <h1 id="center"> Announcement </h1>
              <Announcement />
          </Col>
          <Col span={12} className="right-side">
          <div>calendar</div>
          <div>Service request</div>
          </Col>
      </Row>
    )
  }
   
  export default DashBoard;