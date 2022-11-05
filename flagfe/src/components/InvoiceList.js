import { postInvoice, getInvoiceByStatus, payMyInvoice } from "../utils/invoiceUtils";
import React, { useState }from "react";
import { Form, Menu, Input, Button, Dropdown, Space, Select, message, List, Row, Table, Col } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/ServiceRequest.css'
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

class InvoiceList extends React.Component {

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
            {
                label: 'show only overdue invoices',
                key: 'overdue',
            },
            {
                label: 'show only late invoices',
                key: 'late',
            }
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
            
            const resp = await getInvoiceByStatus("all")
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
            
            const resp = await getInvoiceByStatus(key)
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
    handleCreateLateFee = async(id) => {

        this.setState({
            loading: true,
        });
        try {
            await postInvoice(id);
            message.success("Late fee invoice has been billed!");
            await this.changeData("late")
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
        // if (e.key === 'all') {
        //     // this.loadData()
        //     this.setState({
        //         filter: 'all'
        //     })
        // } else {
            this.changeData(e.key)
        // }
        
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
                                {this.state.filter === "late" && record.lateBillId !== null && (<h4 id="center">Late fee was billed on invoice # {record.lateBillId}.</h4>)} 
                            </Col>
                            <Col span={8}>
                                {this.state.filter === "late" && record.lateBillId === null && (<Button className="cancel-button" onClick={()=> this.handleCreateLateFee(record.id)} >Bill Late Fee</Button>)}
                            </Col>
                        </Row>),}}
                    dataSource = {this.state.data} />
            </div>  
        )
    }
}
export default InvoiceList;