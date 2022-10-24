import { Avatar, Button, List, message, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {getMessage} from '../utils/messageUtils';

const showMessageCount = 6;

class MessagePage extends React.Component{
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
            const resp = await getMessage();
            const curList = resp.slice(0, showMessageCount);
            this.setState({
                loading: true,
                data: resp, // data contains all the messages, list only show the selected ones
                list: curList
            });
        }catch(error){
            message.error(error.message);
        }finally{
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
            <List
                className="messageList"
                loading={this.state.loading}
                itemLayout="horizontal"
                dataSource={this.state.list}
                renderItem={(item) => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">comment</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={item.username}
                        description="This is the content of the message"
                    />
                    </Skeleton>
                </List.Item>
                )}
            />
            {!this.state.loading ? (
                <div
                    style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>loading more</Button>
                </div>
            )
            : null}
            </div>
        );
    }
}

export default MessagePage;