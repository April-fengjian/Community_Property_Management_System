import React from "react";
import { Form, Menu, Input, Button, Dropdown, Space, Select, message, List, Typography, Table } from 'antd';
import {getRequestByProvider,getRequestByStatus,assignRequest, finishRequest} from "../utils/serviceUtils";
class AllRequests extends React.Component{
  columns = [
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
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Upload Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];
  state = {
    loading: false,
    data : [],
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
        
        const resp = await getRequestByStatus("submitted")
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
  handleMarking = async (id,status) => {
    console.log(id)
    this.setState({
      loading: true,
    });

    try {
      await assignRequest(id)
      message.success("Your have mark this request");
      this.loadData();
    } catch (error) {
        message.error(error.message);
    } finally {
      this.setState({
          loading: false,
      });
    }
  };
  render(){
    return (
      <div>
          <Table columns={this.columns} size='small'
            expandable={{expandedRowRender: (record) => (
                    <div style={{ margin: 0 }}>
                        <div>{record.description}</div>
                        <div align="right">
                        <Button onClick={()=> this.handleMarking(record.id,record.status)} >Mark as Processing</Button>
                        </div>
                        
                        {/* <Button className="cancel-button" onClick={()=> this.handleCancel(record.id)} >Cancel Request</Button> */}
                    </div>),}}
            dataSource = {this.state.data} />
      </div>  
    )
  }
}
class MyRequest extends React.Component{
  columns = [
    {
      title: 'My Request',
      dataIndex: 'title',
      key: 'title',
    },
  ]
  state = {
    loading: false,
    data : [],
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
        loading: true,
    });

    try {
        
        const resp = await getRequestByProvider()
        const list = []
        for (let i = 0; i< resp.length; i++) {
          if (resp[i]["status"] === "processing"){
            resp[i]["key"] = i
            list.push(resp[i])
          }
        }
        console.log(list)
        this.setState({
            data: list,
        }); 
    } catch (error) {
        message.error(error.message);
    } finally {
        this.setState({
            loading: false,
        });
    }
  };
  handleMarking = async (id) => {
    console.log(id)
    this.setState({
      loading: true,
    });

    try {
      await finishRequest(id)
      message.success("Your have finish this request");
      this.loadData();
    } catch (error) {
        message.error(error.message);
    } finally {
      this.setState({
          loading: false,
      });
    }
  };
  render(){
    return (
      <div>
          <Table columns={this.columns} size='small'
            expandable={{expandedRowRender: (record) => (
                    <div style={{ margin: 0 }}>
                        <div>{record.description}</div>
                        <div align="right">
                        <Button onClick={()=> this.handleMarking(record.id)} >Mark as Finish</Button>
                        </div>
                        
                        {/* <Button className="cancel-button" onClick={()=> this.handleCancel(record.id)} >Cancel Request</Button> */}
                    </div>),}}
            dataSource = {this.state.data} />
      </div>  
    )
  }
}
class ServiceTasks extends React.Component{
  render() {
      return (
          <div>
              {/* <div>
                  <Filter />
              </div> */}
              <div className="request-list">
              <h4 id="center">All submitted Requests</h4>
                  <AllRequests />
              </div>
              <div className="send-request">
              <h4 id="center">My tasks</h4>
                  <MyRequest />
              </div>
          </div>
          
      );
  }
}
export default ServiceTasks;