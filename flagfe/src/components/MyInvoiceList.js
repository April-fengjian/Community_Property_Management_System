import { getMyInvoice, getMyInvoiceByStatus, payMyInvoice } from "../utils/invoiceUtils";
import React, { useState }from "react";
import { Form, Menu, Input, Button, Dropdown, Space, Select, message, List, Row, Table, Col } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import '../styles/ServiceRequest.css'
import { sendRequest, getTenantRequest, cancelRequest, getRequestByStatus } from "../utils/serviceUtils";
import { render } from "@testing-library/react";
const { TextArea } = Input;
const  columns = [
    {
        title: 'Title',
        dataIndex: 'term',
        key: 'term',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
  ];

class MyInvoiceList extends React.Component {

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
                label: 'show all invoices',
                key: 'all',
              },
            {
              label: 'show only unpaid invoices',
              key: 'unpaid',
            },
            {
              label: 'show only paid invoices',
              key: 'paid',
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
            
            const resp = await getMyInvoice()
            for (let i = 0; i< resp.length; i++) {
                resp[i]["key"] = i
                    
            }
            this.setState({
                data: resp,
            }); 
            message.success("Invoice list loaded!");
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
            
            const resp = await getMyInvoiceByStatus(key)
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
    handlePayInvoice = async(id) => {

        this.setState({
            loading: true,
        });
        try {
            await payMyInvoice(id);
            message.success("Your payment has been recived!");
            await this.loadData();
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
            // this.loadData()
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
                
                <Table columns={columns} size='large'
                    expandable={{expandedRowRender: (record) => (
                        <Row>
                            <Col span={16}>
                                <h4 id="center">{record.description} for Room {record.unit.id}.</h4>
                            </Col>
                            <Col span={8}>
                                {record.paymentDate === null && (<Button className="cancel-button" onClick={()=> this.handlePayInvoice(record.id)} >Pay Now</Button>)}
                            </Col>
                        </Row>),}}
                            // <div style={{ margin: 0 }}>
                            //     <div>{record.description}</div>
                            //     <div align="right">
                            //     {record.paymentDate === null && (<Button className="cancel-button" onClick={()=> this.handlePayInvoice(record.id)} >Pay Now</Button>)}
                            //     </div>
                            // </div>
                    dataSource = {this.state.data} />
            </div>  
        )
    }
}
export default MyInvoiceList;