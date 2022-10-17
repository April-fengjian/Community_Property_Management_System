import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const Message = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [list, setList] = useState([]);
  const refreshList = () => {

  };
  const list = [
    {
      author: 'tenant01',
      title: 'moving sale',
      content: 'content01',
      datetime: moment('2022-10-15').fromNow()
    },
    {
      author: 'tenant02',
      title: 'dog walker needed',
      content: 'content02',
      datetime: moment('2022-10-13').fromNow()
    },
  ];
  // useEffect(() => {
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setInitLoading(false);
  //       setData(res.results);
  //       setList(res.results);
  //     });
  // }, []);
  // const onLoadMore = () => {
  //   setLoading(true);
  //   setList(
  //     data.concat(
  //       [...new Array(count)].map(() => ({
  //         loading: true,
  //         name: {},
  //         picture: {},
  //       })),
  //     ),
  //   );
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const newData = data.concat(res.results);
  //       setData(newData);
  //       setList(newData);
  //       setLoading(false);
  //       // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
  //       // In real scene, you can using public method of react-virtualized:
  //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
  //       window.dispatchEvent(new Event('resize'));
  //     });
  // };
  // const loadMore =
  //   !initLoading && !loading ? (
  //     <div
  //       style={{
  //         textAlign: 'center',
  //         marginTop: 12,
  //         height: 32,
  //         lineHeight: '32px',
  //       }}
  //     >
  //       <Button onClick={onLoadMore}>loading more</Button>
  //     </div>
  //   ) : null;
  return (
    <List
      className="demo-loadmore-list"
      // loading={initLoading}
      itemLayout="horizontal"
      //loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[<Button onClick={refreshList}/>]}
        >
            <List.Item.Meta 
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}             
              author={item.author}
              title={item.title}
              description={item.content}
            />
        </List.Item>
      )}
    />
  );
};
export default Message