
import { Comment, ColumnsType,Col, Row, Divider, Avatar, Skeleton,Form, Menu, Input, Button, Dropdown, Space, Select, message, List, Typography, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import '../styles/ServiceRequest.css'
import { sendRequest, getTenantRequest, cancelRequest, getRequestByStatus } from "../utils/serviceUtils";
import {deletePayment,getUserPayment} from "../utils/paymentUtils";
import { render } from "@testing-library/react";
import InfiniteScroll from 'react-infinite-scroll-component';

const { TextArea } = Input;
const showMessageCount = 6;
const columns = [
   
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    
    {
      title: 'Payment Due',
      dataIndex: 'due_date',
      key: 'due_date',
    },

    {
        title: 'Payment ID',
        dataIndex: 'payment_id',
        key: 'payment_id',
      },
      

];
class Payment extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            data: [],
            list: [],
        }
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async () =>{
        this.setState({
            loading: true,
        });

        try{
            const resp = await getUserPayment();
            const curList = resp.slice(0, showMessageCount);
            this.setState({
                loading: true,
                data: resp, // data contains all the messages, list only show the selected ones
                list: curList
            });
        }catch(error){
            message.error('error.message');
        }finally{
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
            await deletePayment(id);
            message.success("Your Payment is successful.");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    onLoadMore = () =>{
        this.setState({
            loading: true,
        });

        const data = this.state.data;
        const list = this.state.list;
        const curList = data.slice(0, showMessageCount + list.length);
        this.setState({
            list: curList,
            loading: false,
        });
    }
    
    render(){
        return (
            <div>
         
            <Table columns={columns} size='small'
            
                    expandable={{expandedRowRender: (record) => (
                            <div >
                                <Button className="cancel-button"  onClick={()=> this.handleCancel(record.payment_id)} >Make Payment</Button>
                            </div>),}}
                    dataSource = {this.state.data} />
            </div>
        );
    }
}
export default Payment;



