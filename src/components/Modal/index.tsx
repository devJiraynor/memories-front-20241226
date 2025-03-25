import React, { ReactNode, useEffect } from 'react'
import './style.css';

// interface: 공통 모달 컴포넌트 속성 //
interface Props {
  title: string;
  onClose: () => void;
  children?: ReactNode;
}

// component: 공통 모달 컴포넌트 //
export default function Modal({title, onClose, children}: Props) {

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
      <div className='modal-container'>
        <div className='modal-head'>
          <div className='title'>{title}</div>
          <div className='close-button' onClick={onClose} />
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>
  )
}
