  import { Avatar, Button, List, Tooltip, Typography, Modal, Space } from 'antd';
  import React, { useState } from 'react';
  import moment from 'moment';
  import { loadData } from "./PostAnnouncement";
  import { getAnnouncement } from "../utils/messageUtils";

  const { Title, Text } = Typography;

  // const comments = [
  //   {
  //     username: 'tenant01',
  //     title: 'moving sale',
  //     content: 'content01',
  //     time: moment('2022-10-15').fromNow(),
  //     announce_id: '01'
  //   },
  //   {
  //     username: 'tenant01',
  //     title: 'long long long long long long long long long long long long',
  //     content: 'content01',
  //     time: moment('2022-10-15').fromNow(),
  //     announce_id: '01'
  //   },
  //   {
  //     username: 'tenant02',
  //     title: 'dog walker needed',
  //     content: 'content02',
  //     time: moment('2022-10-13').fromNow(),
  //     announce_id: '02'
  //   },
  //   {
  //     username: 'tenant01',
  //     title: 'moving sale',
  //     content: 'content01',
  //     time: moment('2022-10-15').fromNow(),
  //     announce_id: '01'
  //   },
  //   {
  //     username: 'tenant02',
  //     title: 'dog walker needed',
  //     content: 'content02',
  //     time: moment('2022-10-13').fromNow(),
  //     announce_id: '02'
  //   },
  //   {
  //     username: 'tenant01',
  //     title: 'moving sale',
  //     content: 'content01content01content01content01content01content01content01content01content01',
  //     time: moment('2022-10-15').fromNow(),
  //     announce_id: '01'
  //   },
  //   {
  //     username: 'tenant02',
  //     title: 'dog walker needed',
  //     content: 'content02',
  //     time: moment('2022-10-13').fromNow(),
  //     announce_id: '02'
  //   },
  //   {
  //     username: 'tenant01',
  //     title: 'moving sale',
  //     content: 'content01content01content01content01content01content01content01content01content01',
  //     time: moment('2022-10-15').fromNow(),
  //     announce_id: '01'
  //   },
  //   {
  //     username: 'tenant02',
  //     title: 'dog walker needed',
  //     content: 'content02',
  //     time: moment('2022-10-13').fromNow(),
  //     announce_id: '02'
  //   },    {
  //     username: 'tenant01',
  //     title: 'moving sale',
  //     content: 'content01content01content01content01content01content01content01content01content01',
  //     time: moment('2022-10-15').fromNow(),
  //     announce_id: '01'
  //   },
  //   {
  //     username: 'tenant02',
  //     title: 'dog walker needed',
  //     content: 'content02',
  //     time: moment('2022-10-13').fromNow(),
  //     announce_id: '02'
  //   },
  // ];
  const Announcement = () => {
    const [comments, setComments] = useState(getAnnouncement());  

  return (
      <List
      className="announce-list"
      //header={`${comments.length} ${comments.length > 1 ? 'Active Announcements' : 'Active Announcement'}`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item) => (
        <List.Item
          extra={<h4>{item.time}</h4>}
        >
          <List.Item.Meta
              avatar={<Avatar size={40} src='https://joeschmoe.io/api/v1/random' />}
              // title={<h4 id="center">{item.title}</h4>}
              title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Title level={4}>
                      {item.title}
                    </Title>
                    <AnnouncementInfo title={item.title} content={item.content} time={item.time} />
                  </div>
              }
          />
        </List.Item>
      )}
    />
  );
}
   
export default Announcement;


const AnnouncementInfo = (props)=> {
  const [modalVisible,setModalVisible] = useState(false);
 
  const openModal = () => {
    setModalVisible(true);
  };
 
  const handleCancel = () => {
    setModalVisible(false);
  };
 
  return (
      <>
        <Tooltip title="View Annoucement Details">
          <Button className="details"
            onClick={openModal}
            style={{ border: "none" }}
            size="small"
            color="grey"
            type="text"
          >read</Button>
        </Tooltip>
        {modalVisible && (
          <Modal
            title={props.title}
            centered={true}
            visible={modalVisible}
            destroyOnClose={true}
            footer={null}
            onCancel={handleCancel}
          >
            <div>
              <Text strong={true}>{props.content}</Text>
              <div align="right">
                <Text type="secondary">Published </Text>
                <Text type="secondary">{props.time}</Text>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
}