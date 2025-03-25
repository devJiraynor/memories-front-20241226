import React, { useEffect } from 'react'
import './style.css';

// component: 공통 모달 컴포넌트 //
export default function Modal() {

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // render: 공통 모달 컴포넌트 렌더링 //
  return (
    <div id='modal-wrapper'>
      <div className='modal-container'></div>
    </div>
  )
}
