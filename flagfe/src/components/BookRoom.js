import React from "react";
import { getReservations, getStaysByHost, searchStays } from "../utils/bookUtils";
import { StayDetailInfoButton } from "./BookRoom_Manager";
import { message, Tabs, List, Typography,
  Card,
  Image,
  Carousel,
  Button,
  Form,
  InputNumber,
  DatePicker} from "antd";
import {
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import '../styles/BookRoom.css'

const { Text } = Typography;
const { TabPane } = Tabs;

class SearchStays extends React.Component {
  state = {
    data: [],
    loading: false,
  };
 
  search = async (query) => {
    this.setState({
      loading: true,
    });
 
    try {
      // const resp = await searchStays(query);
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
      <>
        <Form onFinish={this.search} layout="inline">
          <Form.Item
            label="Guest Number"
            name="guest_number"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Checkin Date"
            name="checkin_date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Checkout Date"
            name="checkout_date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <List
          style={{ marginTop: 20 }}
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
      </>
    );
  }
}

class MyReservations extends React.Component {
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
      const resp = await getReservations();
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
        style={{ width: 1000, margin: "auto" }}
        loading={this.state.loading}
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item actions={[]}>
            <List.Item.Meta
              title={<Text>{item.stay.name}</Text>}
              description={
                <>
                  <Text>Checkin Date: {item.checkin_date}</Text>
                  <br />
                  <Text>Checkout Date: {item.checkout_date}</Text>
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

const GuestHomePage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Search Rooms" key="1">
        <SearchStays/>
      </TabPane>
      <TabPane tab="My Reservations" key="2">
        <MyReservations />
      </TabPane>
    </Tabs>
  );
}


const BookRoom = (state) => {

    return <GuestHomePage />;

}

export default BookRoom;