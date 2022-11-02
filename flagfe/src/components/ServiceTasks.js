import React from "react";
import { Form, Menu, Input, Button, Dropdown, Space, Select, message, List, Typography, Table } from 'antd';
import {getAllRequest} from "../utils/serviceUtils";
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
        
        const resp = await getAllRequest()
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
  render(){
    return (
      <div>
          <Table columns={this.columns} size='small'
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
class ServiceTasks extends React.Component{
  render() {
      return (
          <div>
              {/* <div>
                  <Filter />
              </div> */}
              <div className="request-list">
                  <AllRequests />
              </div>
              <div className="send-request">
                  My request
              </div>
          </div>
          
      );
  }
}
export default ServiceTasks;