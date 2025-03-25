import React from 'react';
import './style.css';
import UserInfo from './UserInfo';
import RecentlyMemory from './RecentlyMemory';
import RecentlyConcentration from './RecentlyConcentration';

// component: 메인 화면 컴포넌트 //
export default function Main() {

  // render: 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='main-wrapper'>
      <UserInfo />
      <RecentlyMemory />
      <RecentlyConcentration />
    </div>
  )
}
