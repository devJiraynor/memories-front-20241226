import React from 'react';
import './style.css';
import UserInfo from './UserInfo';

// component: 메인 화면 컴포넌트 //
export default function Main() {

  // render: 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='main-wrapper'>
      <UserInfo />
      <div className='recently-container'></div>
    </div>
  )
}
