import React, { useState }from "react";
import { Form, Menu, Input, Button, Dropdown, Space, Select, message, List, Typography, Table } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import '../styles/ServiceRequest.css'
import { sendRequest, getTenantRequest, cancelRequest, getRequestByStatus } from "../utils/serviceUtils";
import { render } from "@testing-library/react";
const { TextArea } = Input;
// const data = [{key: 1,title: "This is title", status: "Submitted", category: "Public", description: "This is Description xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxx xxxxxxxxx xxx xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxxxxxxxx"},
// {key: 2,title: "This is title", status: "Submitted", category: "Public", description: "This is Description"}]
const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'titel',
    },
    {
      title: 'DeadLine',
      dataIndex: 'time',
      key: 'time',
    },
];
class SendRequest extends React.Component{
    state = {
        loading: false
    }

    handleCategoryClick = (label) => {
        console.log('click', label);
    }
    handleSubmit = async (values) => {
        console.log(values)
        // const requestData = new FormData()
        // requestData.append("title",values.title)
        // requestData.append("category",values.category)
        // requestData.append("description",values.description)
        const requestData = {
            "title": values.title,
            "category": values.category,
            "description": values.description,
            "status": "submitted"
        }
        this.setState({
            loading: true,
        });
        try {
            await sendRequest(requestData);
            message.success("Your payment has been sent");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    category = (
        <Menu 
            onClick={this.handleCategoryClick}
            items = {[
                {label: "Private", key: 1},
                {label: "Public", key: 2},
                {label: "Others", key: 3}
            ]}
        />
    );
     
    render() {
        return (
            <div>
                <div className="request-title">Payment Summary</div>
                <Form name="request-form" layout="vertical" onFinish={this.handleSubmit}>
                    <Form.Item className="input-title" name="title" label="Total Payment: ">
                        <h1> $ 2011.19 </h1>
                    </Form.Item>
                    
                    
                    <Form.Item>
                        <Button className="submit-button" loading={this.state.loading} type="primary" htmlType="Payment Submit">
                        submit
                        </Button>
                    </Form.Item>
                    
                </Form>
                
            </div>

        );
    }
}


class ServiceRequest extends React.Component{
    render() {
        return (
            <div>
             
                <div className="request-list">
                  <h1>Welcome to the Payment Method.</h1>
                  <h1>Payment Due on the 1st of each month.</h1>
                  <h1>15% Process Fee with credit card.</h1>
                  <h1>50$ for late submit.</h1>
                  <h1>Have a good day!</h1>
                </div>
                <div className="send-request">
                    <SendRequest />
                </div>
            </div>
            
        );
    }
}
export default ServiceRequest;
