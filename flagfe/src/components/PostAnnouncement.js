import '../App.css';
import { Avatar, Button, Comment, Form, Input, List, message, Typography, Spin, Col, Row, Select} from 'antd';
import React, { useState, useEffect } from 'react';
import { getAnnouncement, postAnnouncement, deleteAnnouncement } from "../utils/messageUtils";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const CommentList = ({comments, handleDelete}) => (
// “title”: ”xxx”,
// “time”: Date,
// “description”: “...”,
// “user”:”xxx”
// “id":xx
// "importance"
  <List
    className="comment-list" style={{height : 550, overflow: "auto", padding: '0 16px',}}
    footer={`${comments.length} ${comments.length > 1 ? 'Active Announcements' : 'Active Announcement'}`}
    itemLayout="horizontal"
    dataSource={comments}
    // handleDelete={handleDelete}
    renderItem={(item) => (
      <li>
          <Row> 
            <Col span={20} className="right-side">
              <Title level={5} type={item.importance}>{item.title}</Title>
            </Col>
            <Col span={4} className="right-side">
            <div align="right">    
              {true && (<Button onClick={() => handleDelete(item.id)}>Delete</Button>)}
            </div>
            </Col>
          </Row>
          <Comment className="message-content"
            author={item.user.username}
            avatar={<Avatar src={item.user.avatar} />}
            content={item.description}
            datetime={moment.utc(item.time).format('MM/DD/YY HH:mm:ss')}
          />
      </li>
    )}
  />
);

const PostAnnouncement = () => {
  const [comments, setComments] = useState([]);           
  const [isLoad, setIsLoad] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAnnouncement()
      .then((response) => {
        setComments(response)
      }).catch((err) => {
        message.error(err.message)
      });
    setIsLoad(true);
  }, [])
           
  const handleSubmit = async (data) => {  
    form.resetFields();  
    setIsLoad(false); 
    try {
      await postAnnouncement(data);
      message.success("Post Successfully");
    } catch (error) {
      message.error(error.message);
    } 
       
    try {
      await getAnnouncement()
      .then((response) => {
        setComments(response)
      });
      // message.success("Update Successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoad(true);
    }
  };
  

  const handleDelete = async (deleteId) => {  
    setIsLoad(false);
    try {
      await deleteAnnouncement(deleteId);
      message.success("Delete Successfully");
      await getAnnouncement()
      .then((response) => {
        setComments(response)
      });
      // message.success("Update Successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoad(true);
    }
  };
  return (
    <>
      {
        !isLoad ?
        <div className="spin-box">
            <Spin tip="Loading..." size="large" />
        </div>
        :
        <>
            {comments.length > 0 && <CommentList comments={comments} handleDelete={handleDelete}/>}
            <Form 
              onFinish={handleSubmit}            
              labelCol={{
              flex: '100px',
              }}
            >
              <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Content"
                rules={[{ required: true }]}
              >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
              </Form.Item>
              <Form.Item name="importance" label="Importance" rules={[{ required: true }]}>
              <Select style={{ width: 120 }}>
                <Option value="success">Low</Option>
                <Option value="warning">Midum</Option>
                <Option value="danger">High</Option>
              </Select>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Post Announcement
                </Button>
              </Form.Item>
            </Form>
        </>
      }
    </>
  );
};

 
export default PostAnnouncement;