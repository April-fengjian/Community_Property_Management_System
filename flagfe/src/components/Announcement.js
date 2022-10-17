  import { Comment, List, Tooltip } from 'antd';
  import React from 'react';

  const comments = [
    {
      author: 'tenant01',
      content: 'content01',
      datetime: 'time01'
    },
    {
      author: 'tenant02',
      content: 'content02',
      datetime: 'time02'
    },
  ];
  const Announcement = () => (
    <List
    className="comment-list"
    header={`${comments.length} ${comments.length > 1 ? 'Active Announcements' : 'Active Announcement'}`}
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={(item) => (
      <li>
        <Comment
          author={item.author}
          avatar='https://joeschmoe.io/api/v1/random'
          content={item.content}
          datetime={item.datetime}
        />
      </li>
    )}
  />
);
   
export default Announcement;