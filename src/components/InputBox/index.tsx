import React from 'react';
import './style.css';

// component: 공통 인풋 박스 컴포넌트 //
export default function InputBox() {

  // render: 공통 인풋 박스 컴포넌트 //
  return (
    <div className='input-box'>
      <div className='label'>아이디</div>
      <div className='input-contents'>
        <div className='input-area'>
          <input placeholder='아이디를 입력하세요.' />
          <div className='button second'>중복 확인</div>
        </div>
        <div className='message error'>사용 가능한 아이디 입니다.</div>
      </div>
    </div>
  )
}
