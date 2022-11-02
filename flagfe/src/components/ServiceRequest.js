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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Upload Time',
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
            message.success("Your request has been sent");
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
                <div className="request-title">Send a Request</div>
                <Form name="request-form" layout="vertical" onFinish={this.handleSubmit}>
                    <Form.Item className="input-title" name="title" label="Title: ">
                        <Input placeholder="Click to type the title of the request"></Input>
                    </Form.Item>
                    <Form.Item className="input-title" name="category" label="Category: ">
                        {/* <Dropdown overlay={this.category}>
                            <Button>
                                <Space>
                                Please select a category
                                <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown> */}
                        <Select>
                            <Select.Option value="private">Private</Select.Option>
                            <Select.Option value="public">Public</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="input-title" name="description" label="Description: ">
                        <TextArea rows={6} placeholder="Write your description here" />
                    </Form.Item>
                    <div className="input-title">Be sure you hit the submit button before leaving the page  </div>
                    <Form.Item>
                        <Button className="submit-button" loading={this.state.loading} type="primary" htmlType="submit">
                        submit
                        </Button>
                    </Form.Item>
                    
                </Form>
                
            </div>

        );
    }
}
class RequestList extends React.Component {
    state = {
        loading: false,
        data : [],
        filter: 'Filter'
    }

    menu = (
        <Menu
          onClick={(e)=>this.handleFilterClick(e)}
          items={[
            {
                label: 'show all request',
                key: 'all',
              },
            {
              label: 'show only submitted request',
              key: 'submitted',
            },
            {
              label: 'show only processing request',
              key: 'processing',
            },
            {
              label: 'show only finish request',
              key: 'finish',
            },
          ]}
        />
    );
    
    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            
            const resp = await getTenantRequest()
            for (let i = 0; i< resp.length; i++) {
                resp[i]["key"] = i
                    
            }
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
    changeData = async(key) => {
        this.setState({
            loading: true,
        });

        try {
            
            const resp = await getRequestByStatus(key)
            for (let i = 0; i< resp.length; i++) {
                resp[i]["key"] = i
                    
            }
            this.setState({
                data: resp,
                filter: key
            }); 
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    }
    handleCancel = async(id) => {
        // e.preventDefault()
        // console.log(id)
        // cancelRequest(id)
        this.setState({
            loading: true,
        });
        try {
            await cancelRequest(id);
            message.success("Your request has been cancel");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    }
    
    handleFilterClick = (e) => {
        console.log('click', e.key);
        if (e.key === 'all') {
            this.loadData()
            this.setState({
                filter: 'all'
            })
        } else {
            this.changeData(e.key)
        }
        
    }
    render(){
        return (
            <div>
                <div align='right' className="filter">
                    <Dropdown overlay={this.menu}>
                        <Button>
                            <Space>
                            {this.state.filter}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                
                <Table columns={columns} size='small'
                    expandable={{expandedRowRender: (record) => (
                            <div style={{ margin: 0 }}>
                                <div>{record.description}</div>
                                {/* <Button className="cancel-button" onClick={this.handleCancel.bind(this, record.id)} >Cancel Request</Button> */}
                                <Button className="cancel-button" onClick={()=> this.handleCancel(record.id)} >Cancel Request</Button>
                            </div>),}}
                    dataSource = {this.state.data} />
            </div>  
        )
    }

}
class Filter extends React.Component{
    menu = (
        <Menu
          onClick={this.handleFilterClick}
          items={[
            {
              label: 'show only submitted request',
              key: 'submitted',
            },
            {
              label: 'show only processing request',
              key: 'processing',
            },
            {
              label: 'show only finish request',
              key: 'finish',
            },
          ]}
        />
    );
    // changeData = async (status) => {
    //     this.setState({
    //         loading: true,
    //     });

    //     try {
            
    //         const resp = await getRequestByStatus(status)
    //         for (let i = 0; i< resp.length; i++) {
    //             resp[i]["key"] = i
                    
    //         }
    //         this.setState({
    //             data: resp,
    //         }); 
    //     } catch (error) {
    //         message.error(error.message);
    //     } finally {
    //         this.setState({
    //             loading: false,
    //         });
    //     }
    // };
    handleFilterClick(e){
        console.log('click', e.key);
        // this.changeData(e.key)
    }
    render(){
        return (
            <Dropdown overlay={this.menu} className="filter">
                <Button>
                    <Space>
                    Filter
                    <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        );   
    }
}

class ServiceRequest extends React.Component{
    render() {
        return (
            <div>
                {/* <div>
                    <Filter />
                </div> */}
                <div className="request-list">
                    <RequestList />
                </div>
                <div className="send-request">
                    <SendRequest />
                </div>
            </div>
            
        );
    }
}
export default ServiceRequest;
