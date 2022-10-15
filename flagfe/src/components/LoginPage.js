import React from "react";
import { Form, Button, Input, Space, Checkbox, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";
 
class LoginPage extends React.Component {
  formRef = React.createRef();  //创建一个容器，77行知道去哪里要到数据，32行要到数据
  state = {
    asManager: false,
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
      const { asManager } = this.state;
      const resp = await login(formInstance.getFieldsValue(true), asManager);   
      this.props.handleLoginSuccess(resp.token, asManager);     
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
      await register(formInstance.getFieldsValue(true), this.state.asManager);
      message.success("Register Successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
 
  handleCheckboxOnChange = (e) => {
    this.setState({
      asManager: e.target.checked,
    });
  };
 
  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
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
        </Form>
        <Space>
          <Checkbox
            disabled={this.state.loading}
            checked={this.state.asManager}
            onChange={this.handleCheckboxOnChange}
          >
            As Manager
          </Checkbox>
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
    );
  }
}
 
export default LoginPage;
