import React, { useState }from "react";
import { Layout, Menu, Input, Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import '../styles/ServiceRequest.css'
const { TextArea } = Input;

class SendRequest extends React.Component{
    state = {
        loading: false
    }

    handleCategoryClick = (e) => {
        console.log('click', e);
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
                <div className="request-title">Send a Request</div>
                <div className="input-title">Title: </div>
                <Input placeholder="Click to type the title of the request"></Input>
                <div className="input-title">Category: </div>
                <Dropdown overlay={this.category}>
                    <Button>
                        <Space>
                        Please select a category
                        <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
                <div className="input-title">Discription: </div>
                <TextArea rows={6} placeholder="Write your description here" maxLength={8} />
                <div className="input-title">Be sure you hit the submit button before leaving the page  </div>
                <Button className="submit-button" loading={this.state.loading} type="primary" htmlType="submit">
                submit
                </Button>
            </div>

        );
    }
}

class ServiceRequest extends React.Component{
    render() {
        return (
            <div>
                <div className="request-list">
                    request list
                </div>
                <div className="send-request">
                    <SendRequest />
                </div>
            </div>
            
        );
    }
}
export default ServiceRequest;
