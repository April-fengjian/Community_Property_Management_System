import '../App.css';
import { Avatar, Button, Comment, Form, Input, List, message, Typography } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import Message from './Message';
import { getAnnouncement, postAnnouncement, deleteAnnouncement } from "../utils/messageUtils";

const { Title } = Typography;

const commentsstatic = [
  {
    username: 'tenant01',
    title: 'moving sale',
    content: 'content01',
    time: moment('2022-10-15').fromNow(),
    announce_id: '01'
  },
  {
    username: 'tenant02',
    title: 'dog walker needed',
    content: 'content02',
    time: moment('2022-10-13').fromNow(),
    announce_id: '02'
  },
];
const CommentList = ({comments, handleDelete}) => (
// “title”: ”xxx”,
// “time”: Date,
// “content”: “...”,
// “username”:”xxx”
// “announce_id":xx
  <List
    className="comment-list"
    footer={`${comments.length} ${comments.length > 1 ? 'Active Announcements' : 'Active Announcement'}`}
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={(item) => (
      <li>
        <div> 
          <div> 
            <Title level={5}>{item.title}</Title>
          </div>
          <div> 
          <Comment
            author={item.username}
            avatar='https://joeschmoe.io/api/v1/random'
            content={item.content}
            datetime={item.time}
            />
          </div>
          <div align="right">    
          {true && (<Button onClick={handleDelete} deleteId={item.announce_id}>Delete</Button>)}
          </div>
        </div>
      </li>
    )}
  />
);

const PostAnnouncement = () => {
  const [comments, setComments] = useState([]);             //以后useState[]要调用getAnnouncement函数.json
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getAnnouncement();
      setComments(response);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }
           
//   const handleSubmit = async (data) => {   //连后端后会替换下面的onFinish
//     setSubmitting(true); 
//     try {
//       await postAnnouncement(data);
//       message.success("Post Successfully");
//     } catch (error) {
//       message.error(error.message);
//     } 
//        
//     try {
//       await getAnnouncement();
//       message.success("Update Successfully");
//     } catch (error) {
//       message.error(error.message);
//     } finally {
//        setSubmitting(false);
//     }
//   };
  
  const onFinish = (data) => {
    data ["time"] = moment().format('MMMM Do YYYY, h:mm:ss a');
    setComments([...comments, data]);
  }

  const handleDelete = () => {  //param = deleteId
    console.log("I will delete");
//     setSubmitting(true); 
//     try {
//       await deleteAnnounce(deleteId);
//       setComments(getAnnouncement);
//       message.success("Delete Successfully");
//     } catch (error) {
//       message.error(error.message);
//     } finally {
//        setSubmitting(false);
//     }
  };
  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} handleDelete={handleDelete}/>}
      <Form 
        onFinish={onFinish}            
        labelCol={{
        flex: '100px',
        }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={submitting} type="primary">
            Post Announcement
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

 
export default PostAnnouncement;