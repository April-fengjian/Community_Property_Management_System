  import { Avatar, Button, List, Tooltip, Typography, Modal, message } from 'antd';
  import React, { useState, useEffect } from 'react';
  import { getAnnouncement } from "../utils/messageUtils";

  const { Title, Text } = Typography;

  const Announcement = () => {
    const [comments, setComments] = useState([]);  

  useEffect(() => {
    getAnnouncement()
      .then((response) => {
        setComments(response)
      }).catch((err) => {
        message.error(err.message)
      });
  }, [])

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
                    <Title level={4} type={item.importance}>
                      {item.title}
                    </Title>
                    <AnnouncementInfo title={item.title} discription={item.description} time={item.time} />
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
          >read more</Button>
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
              <Text>{props.discription}</Text>
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