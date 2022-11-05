import React from "react";
import { Form, Menu, Input, Button, Dropdown, Row, Col, message, List, Typography, Table } from 'antd';
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
      dataIndex: 'tenant_id',
      key: 'tenant_id',
    },
    {
      title: 'Upload Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];
  render(){
    return (
      <div>
          <Table columns={this.columns} size='small'
            expandable={{expandedRowRender: (record) => (
                    <div style={{ margin: 0 }}>
                        <div>{record.description}</div>
                        <div align="right">
                        <Button onClick={()=> this.props.handleMarking(record.id,record.status)} >Mark as Processing</Button>
                        </div>
                        
                        {/* <Button className="cancel-button" onClick={()=> this.props.handleCancel(record.id)} >Cancel Request</Button> */}
                    </div>),}}
            dataSource = {this.props.data} />
      </div>  
    )
  }
}
class MyRequest extends React.Component{
  columns = [
    {
      title: 'My Claimed Requests',
      dataIndex: 'title',
      key: 'title',
    },
  ]

  render(){
    return (
      <div>
          <Table columns={this.columns} size='small'
            expandable={{expandedRowRender: (record) => (
                    <div style={{ margin: 0 }}>
                        <div>{record.description}</div>
                        <div align="right">
                        <Button onClick={()=> this.props.handleMarking(record.id)} >Mark as Finish</Button>
                        </div>

                    </div>),}}
            dataSource = {this.props.data} />
      </div>  
    )
  }
}
class ServiceTasks extends React.Component{
  state = {
    loading: false,
    submittedData : [],
    processingData: [],
  }
  componentDidMount() {
    this.loadSubmittedData();
    this.loadProcessingData();
  }
  loadSubmittedData = async () => {
    this.setState({
        loading: true,
    });

    try {
        
        const resp = await getRequestByStatus("submitted")
        for (let i = 0; i< resp.length; i++) {
            resp[i]["key"] = i
                
        }
        this.setState({
          submittedData: resp,
        }); 
    } catch (error) {
        message.error(error.message);
    } finally {
        this.setState({
            loading: false,
        });
    }
  };
  handleMarkingToProcessing = async (id,status) => {
    console.log(id)
    this.setState({
      loading: true,
    });

    try {
      await assignRequest(id)
      message.success("Your have claimed this request to your processing list!");
      this.loadSubmittedData()
      this.loadProcessingData()
      message.success("Your lists have been updated");
    } catch (error) {
        message.error(error.message);
    } finally {
      this.setState({
          loading: false,
      });
    }
  };
  loadProcessingData = async () => {
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
            processingData: list,
        }); 
    } catch (error) {
        message.error(error.message);
    } finally {
        this.setState({
            loading: false,
        });
    }
  };
  handleMarkingToFinish = async (id) => {
    console.log(id)
    this.setState({
      loading: true,
    });

    try {
      await finishRequest(id)
      message.success("Your have finish this request");
      this.loadProcessingData()
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
                  <Row className='main'>
                  <Col span={15} className="left-side">
                      <h1 id="center"> All submitted Requests </h1>
                      <AllRequests 
                      data={this.state.submittedData}
                      loadSubmittedData={this.loadSubmittedData}
                      loadProcessingData={this.loadProcessingData}
                      handleMarking={this.handleMarkingToProcessing}
                      />
                  </Col>
                  <Col span={1}></Col>
                  <Col span={8} className="right-side" id="high">
                      <h1 id="center"> My tasks </h1>
                      <MyRequest 
                      data={this.state.processingData}
                      loadSubmittedData={this.loadSubmittedData}
                      loadProcessingData={this.loadProcessingData}
                      handleMarking={this.handleMarkingToFinish}
                      />
                  </Col>
                </Row>
          
      );
  }
}
export default ServiceTasks;