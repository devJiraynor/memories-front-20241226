import React from 'react';
import './style.css';
import InputBox from 'src/components/InputBox';

// component: 로그인 회원가입 화면 컴포넌트 //
export default function Auth() {

  // render: 로그인 회원가입 화면 컴포넌트 렌더링 //
  return (
    <div id='auth-wrapper'>
      <div className='auth-side-image'></div>
      <div className='auth-box'>
        <div id='auth-login-container'>
          <div className='header'>Memories</div>
          <div className='input-container'>
            <InputBox />
            <InputBox />
          </div>
          <div className='button-container'></div>
          <div className='divider'></div>
          <div className='sns-container'></div>
        </div>
      </div>
    </div>
  )
}
