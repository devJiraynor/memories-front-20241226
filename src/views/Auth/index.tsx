import React, { useEffect, useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

import { AuthPage } from 'src/types/aliases';

import './style.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, JOIN_TYPE, MAIN_ABSOLUTE_PATH, SNS_ID } from 'src/constants';

// component: 로그인 회원가입 화면 컴포넌트 //
export default function Auth() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 페이지 상태 //
  const [page, setPage] = useState<AuthPage>('sign-in');

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 페이지 변경 이벤트 처리 //
  const onPageChangeHandler = (page: AuthPage) => {
    setPage(page)
  };

  // effect: 화면 렌더시 실행할 함수 //
  useEffect(() => {
    if (cookies[ACCESS_TOKEN]) navigator(MAIN_ABSOLUTE_PATH);
    if (cookies[JOIN_TYPE] && cookies[SNS_ID]) setPage('sign-up');
  }, []);

  // render: 로그인 회원가입 화면 컴포넌트 렌더링 //
  return (
    <div id='auth-wrapper'>
      <div className='auth-side-image'></div>
      <div className='auth-box'>
        {page === 'sign-in' ? 
        <SignIn onPageChange={onPageChangeHandler} /> : 
        <SignUp onPageChange={onPageChangeHandler} />
        }
      </div>
    </div>
  )
}
