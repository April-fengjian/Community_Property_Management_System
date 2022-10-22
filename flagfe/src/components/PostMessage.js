import { Button, Comment, Form, Input, List, message, Typography, Col, Row, Divider, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useEffect, useState } from 'react';
import { deleteMessage, getMyMessage, postMessage, getTopMessage, getMyTopMessage } from '../utils/messageUtils';
import moment from "moment";

const { Title } = Typography;

const PostMessage = () => {
  const [comments, setComments] = useState([]);
//   const [data, setData] = useState([]);
//   const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mine, setMine] = useState(false);
  let noMoreData = false;
  Array.prototype.peek = function () {
    if (this.length === 0) {
      throw new Error("out of bounds");
    }
    return this[this.length - 1];
  };
  const getData = () => {
    if (loading) {
        return;
      }
    setLoading(true);
    const lastTime = comments.length > 0 ? comments.peek().time : "3000-10-21T10:09:51";
    getTopMessage(lastTime)
    .then((response) => {
        if(response.length === 0) {
            message.success("end of all messages!");
            noMoreData = true;
        } else {
            setComments(comments.concat(response));
            message.success(`${response.length} more messages loaded!`);
        }
    }).catch((err) => {
        message.error(err.message)
    })
    setLoading(false);
  };

  const getMyData = () => {
    if (loading) {
        return;
      }
    setLoading(true);
    const lastTimeMine = comments.length > 0 ? comments.peek().time : "3000-10-21T10:09:51";
    getMyTopMessage(lastTimeMine)
    .then((response) => {
        if(response.length === 0) {
            message.success("end of all messages!");
            noMoreData = true;
        } else {
            setComments(comments.concat(response));
            message.success(`${response.length} more messages loaded!`);
        }
    }).catch((err) => {
        message.error(err.message)
    })
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (input) => {   
    try {
      await postMessage(input);
      message.success("Post Successfully");
    } catch (error) {
      message.error(error.message);
    }        
    try {
       setComments([]);
       noMoreData = false;
      if (!mine) {
        getData();
      } else {
        getMyData();
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  
  const handleDelete = async (deleteId) => {  
    try {
      await deleteMessage(deleteId);
      message.success("Delete Successfully");
      setComments([]);
      noMoreData = false;
      getMyData();
    } catch (error) {
      message.error(error.message);
    } 
  };

  const handleFilter = () => {
    setComments([]);
    noMoreData = false;
    if (!mine) {
        getMyData();
      } else {
        getData();
    }
    setMine(a => !a);
  };

  return (
    <>
    <div align="right">    
        <Button onClick={handleFilter}>{mine ? "View All" : "View Mine"}</Button>
    </div>
    <Divider plain> </Divider>
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: 'auto',
        padding: '0 16px',
        // border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={comments.length}
        next={mine ? getMyData : getData}
        hasMore={!noMoreData}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={comments}
          renderItem={(item) => (
            <li>
                <Row> 
                  <Col span={20} className="right-side">
                    <Title level={5} >{item.title}</Title>
                  </Col>
                  <Col span={4} className="right-side">
                  <div align="right">    
                    {mine && (<Button onClick={() => handleDelete(item.id)}>Delete</Button>)}
                  </div>
                  </Col>
                </Row>
                <Comment
                  author={item.user.username}
                  avatar='https://joeschmoe.io/api/v1/random'
                  content={item.description}
                  datetime={moment.utc(item.time).format('MM/DD/YY HH:mm:ss')}
                />
            </li>
          )}
        />
      </InfiniteScroll>
    </div>
    <Divider plain> Post New Message </Divider>
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
        <Form.Item>
        <Button htmlType="submit" type="primary">
            Post
        </Button>
        </Form.Item>
    </Form>
    </>
  );
};
export default PostMessage;