//import { addAnnouncement, getAnnouncement } from "../utils/messageUtilsutils";
import '../App.css';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import Message from './Message';
const { TextArea } = Input;
const CommentList = ({comments, handleDelete}) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'Active Announcements' : 'Active Announcement'}`}
    itemLayout="horizontal"
    renderItem={(comments) =>
      <div> 
        <div> 
          <Comment {...comments} /> 
        </div>
        <div align="right">    
          {true && (<Button onClick={handleDelete}>Delete</Button>)}
        </div>
      </div>
    }
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Post Announcement
      </Button>
    </Form.Item>
  </>
);
const PostAnnouncement = () => {
//  const [comments, setComments] = useState([]);             //以后useState[]要调用getAnnouncement函数.json
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  comments = 
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().format('MMMM Do YYYY, h:mm:ss a')
        },
      ]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleDelete = () => {
    console.log("I will delete");
  };
  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} handleDelete={handleDelete}/>}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Manager ID" />}
        title={comments.title}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

 
export default PostAnnouncement;