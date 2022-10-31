import React from "react";
import { getStaysByHost, uploadStay } from "../utils/bookUtils";
import { message, Tabs, List, Typography,
  Card,
  Image,
  Carousel,
  Button,
  Tooltip,
  Space,
  Modal,
  Form, 
  Input, 
  InputNumber,
} from "antd";
import {
  LeftCircleFilled,
  RightCircleFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { TabPane } = Tabs;

export class StayDetailInfoButton extends React.Component {
    state = {
      modalVisible: false,
    };
   
    openModal = () => {
      this.setState({
        modalVisible: true,
      });
    };
   
    handleCancel = () => {
      this.setState({
        modalVisible: false,
      });
    };
   
    render() {
      const { stay } = this.props;
      const { name, maxcapacity } = stay;
      const { modalVisible } = this.state;
      return (
        <>
          <Tooltip title="View Stay Details">
            <Button
              onClick={this.openModal}
              style={{ border: "none" }}
              size="large"
              icon={<InfoCircleOutlined />}
            />
          </Tooltip>
          {modalVisible && (
            <Modal
              title={name}
              centered={true}
              visible={modalVisible}
              closable={false}
              footer={null}
              onCancel={this.handleCancel}
            >
              <Space direction="vertical">
                {/* <Text strong={true}>Description</Text>
                <Text type="secondary">{description}</Text> */}
                {/* <Text strong={true}>Address</Text>
                <Text type="secondary">{address}</Text> */}
                <Text strong={true}>Guest Number</Text>
                <Text type="secondary">{maxcapacity}</Text>
              </Space>
            </Modal>
          )}
        </>
      );
    }
  }
  

  class MyStays extends React.Component {
    state = {
        loading: false,
        data: [],
    };
  
    componentDidMount() {
        this.loadData();
    }
  
    loadData = async () => {
        this.setState({
            loading: true,
        });
  
        try {
            const resp = await getStaysByHost();
            this.setState({
                data: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };
    
    
    render() {
        return (
            <List
                loading={this.state.loading}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 3,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.id}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.name}
                                    </Text>
                                    <StayDetailInfoButton stay={item} />
                                </div>
                            }
                            actions={[]}
                            extra={null}
                        >
                            {
                                <Carousel
                                    dots={false}
                                    arrows={true}
                                    prevArrow={<LeftCircleFilled />}
                                    nextArrow={<RightCircleFilled />}
                                >
                                    {/* {item.images.map((image, index) => (
                                        <div key={index}>
                                            <Image src={image.url} width="100%" />
                                        </div>
                                    ))} */}
                                </Carousel>
                            }
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  class UploadStay extends React.Component {
    state = {
      loading: false,
    };
   
    fileInputRef = React.createRef();
   
    handleSubmit = async (values) => {
      const formData = new FormData();
      // const { files } = this.fileInputRef.current;
   
      // if (files.length > 5) {
      //   message.error("You can at most upload 5 pictures.");
      //   return;
      // }
   
      // for (let i = 0; i < files.length; i++) {
      //   formData.append("images", files[i]);
      // }
   
      formData.append("name", values.name);
      // formData.append("address", values.address);
      // formData.append("description", values.description);
      formData.append("maxcapacity", values.maxcapacity);
   
      this.setState({
        loading: true,
      });
      try {
        await uploadStay(formData);
        message.success("upload successfully");
      } catch (error) {
        message.error(error.message);
      } finally {
        this.setState({
          loading: false,
        });
      }
    };
   
    render() {
      return (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.handleSubmit}
          style={{ maxWidth: 1000, margin: "auto" }}
        >
          <Form.Item name="name" label="Room number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
          {/* <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item> */}
          <Form.Item
            name="maxcapacity"
            label="Max capacity"
            rules={[{ required: true, type: "number", min: 1 }]}
          >
            <InputNumber />
          </Form.Item>
          {/* <Form.Item name="picture" label="Picture" rules={[{ required: true }]}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={this.fileInputRef}
              multiple={true}
            />
          </Form.Item> */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const ManagerStayPage = () => {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Rooms" key="1">
          <MyStays />
        </TabPane>
        <TabPane tab="Add Room" key="2">
          <UploadStay />
        </TabPane>
      </Tabs>
    );
  }
  export default ManagerStayPage;