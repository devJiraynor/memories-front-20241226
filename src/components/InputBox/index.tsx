import React, { ChangeEvent } from 'react';
import './style.css';

// interface: 공통 인풋 박스 컴포넌트 속성 //
interface Props {
  label: string;
  value: string;
  placeholder: string;
  type: 'text' | 'password';
  buttonName: string;
  message: string;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// component: 공통 인풋 박스 컴포넌트 //
export default function InputBox(props: Props) {

  const { label, value, placeholder, type, buttonName, message } = props;
  const { onChange } = props;

  // render: 공통 인풋 박스 컴포넌트 //
  return (
    <div className='input-box'>
      <div className='label'>{label}</div>
      <div className='input-contents'>
        <div className='input-area'>
          <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
          <div className='button second'>{buttonName}</div>
        </div>
        <div className='message error'>{message}</div>
      </div>
    </div>
  )
}
