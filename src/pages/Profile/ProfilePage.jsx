import React from 'react'

import { Tabs } from 'antd';
import ProfileTab from './ProfileTab';
import HistoryTab from './HistoryTab';
function ProfilePage() {

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `Profile`,
      children: <ProfileTab/>,
    },
    {
      key: '2',
      label: `Transaction history`,
      children: <HistoryTab/>,
    },
  ];
  return (
    <>
     <Tabs defaultActiveKey="1" className='px-12' items={items} onChange={onChange} />
    </>
  )
}

export default ProfilePage