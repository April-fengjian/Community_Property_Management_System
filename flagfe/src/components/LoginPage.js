import React from "react";
import { Form, Button, Input, Space, Select, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";
import picture from '../resources/picture.jpg';

const { Option } = Select;
 
class LoginPage extends React.Component {
  formRef = React.createRef();  //创建一个容器，77行知道去哪里要到数据，32行要到数据
  state = {
    loading: false,
  };
 
  onFinish = () => {
    console.log("finish form");
  };
 
  handleLogin = async () => {
    const formInstance = this.formRef.current;
 
    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }
 
    this.setState({
      loading: true,
    });
 
    try {
      const resp = await login(formInstance.getFieldsValue(true));   
      this.props.handleLoginSuccess(resp.token, formInstance.getFieldsValue(true).role);     
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
 
  handleRegister = async () => {  
    const formInstance = this.formRef.current;
 
    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }
 
    this.setState({
      loading: true,
    });
 
    try {
      await register(formInstance.getFieldsValue(true));
      message.success("Register Successfully");
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
      <div style={{ width: 500, margin: "20px auto" }}>
        <div style={{ backgroundImage: `url(${picture})`, opacity: 0.9, width:"100%", height:"100%", position: "absolute", top: "64px", left: "0px"}}></div>
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select style={{ width: 120 }}>
                <Option value="tenant">Tenant</Option>
                <Option value="manager">Manager</Option>
                <Option value="provider">Provider</Option>
              </Select>
        </Form.Item>
        </Form>
        <div align="right">
        <Space>
          <Button
            onClick={this.handleLogin}
            disabled={this.state.loading}
            shape="round"
            type="primary"
          >
            Log in
          </Button>
          <Button
            onClick={this.handleRegister}
            disabled={this.state.loading}
            shape="round"
            type="primary"
          >
            Register
          </Button>
        </Space>
        </div>
      </div>
    );
  }
}
 
export default LoginPage;
