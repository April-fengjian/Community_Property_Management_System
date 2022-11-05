import React, { useState }from "react";
import { Form, Menu, Input, Button, Dropdown, Space, Select, message, Row, Col, Table } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import '../styles/ServiceRequest.css'
import { sendRequest, getTenantRequest, cancelRequest, getRequestByStatus } from "../utils/serviceUtils";
import { render } from "@testing-library/react";
const { TextArea } = Input;

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
        // this.props.form.resetFields();
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
            await this.props.loadData();
            message.success("Your request list has been updated");
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
                {/* <div className="request-title">Send a Request</div> */}
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

    menu = (
        <Menu
          onClick={(e)=>this.props.handleFilterClick(e)}
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

    render(){
        return (
            <div>
                <div align='right' className="filter">
                    <Dropdown overlay={this.menu}>
                        <Button>
                            <Space>
                            {this.props.filter}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                
                <Table columns={columns} size='small'
                    expandable={{expandedRowRender: (record) => (
                            <div style={{ margin: 0 }}>
                                <div>{record.description}</div>
                                <div align="right">
                                    <Button onClick={()=> this.props.handleCancel(record.id)} >Cancel Request</Button>
                                </div>
                            </div>),}}
                    dataSource = {this.props.data} />
            </div>  
        )
    }

}

class ServiceRequest extends React.Component{
    // state = {
    //     reload: false
    // }
    state = {
        loading: false,
        data : [],
        allRequest: [],
        filter: 'Filter'
    }

    
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
                allRequest: resp,
            }); 
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };
    changeData = (newStatus) => {
        const newData = [];
        const oldData = this.state.allRequest;
        for (let i = 0; i < oldData.length; i++) {
            if(oldData[i]["status"] === newStatus){
                newData.push(oldData[i])
            }
        }
        this.setState({
            data: newData,
            filter: newStatus,
        });
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
            await this.loadData();
            message.success("Your request has been canceled!");
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
    render() {
        return (
            <div>
                {/* <div>
                    <Filter />
                </div> */}
                {/* <div className="request-list">
                    <RequestList 
                    data={this.state.data}
                    loadData={this.loadData}
                    allRequest={this.state.allRequest}
                    filter={this.state.filter}
                    changeData={this.changeData}
                    handleCancel={this.handleCancel}
                    handleFilterClick={this.handleFilterClick}
                    />
                </div>
                <div className="send-request">
                    <SendRequest 
                    loadData={this.loadData}
                    />
                </div> */}
        <Row className='main'>
          <Col span={15} className="left-side">
              <h1 id="center"> Your Service Requests </h1>
              <RequestList 
                    data={this.state.data}
                    loadData={this.loadData}
                    allRequest={this.state.allRequest}
                    filter={this.state.filter}
                    changeData={this.changeData}
                    handleCancel={this.handleCancel}
                    handleFilterClick={this.handleFilterClick}
                    />
          </Col>
          <Col span={1}></Col>
          <Col span={8} className="right-side" id="high">
          <h1 id="center"> Submit A New Request </h1>
                    <SendRequest 
                    loadData={this.loadData}
                    />
          </Col>
        </Row>
            </div>
            
        );
    }
}
export default ServiceRequest;
