import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import InputBox from 'src/components/InputBox';
import { AuthPage } from 'src/types/aliases';
import { signInRequest, SNS_SIGN_IN_URL } from 'src/apis';
import { SignInRequestDto } from 'src/apis/dto/request/auth';
import { SignInResponseDto } from 'src/apis/dto/response/auth';
import { ResponseDto } from 'src/apis/dto/response';

import './style.css';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, MAIN_ABSOLUTE_PATH, ROOT_PATH } from 'src/constants';


// interface: 로그인 컴포넌트 속성 //
interface Props {
  onPageChange: (page: AuthPage) => void;
}

// component: 로그인 컴포넌트 //
export default function SignIn(props: Props) {

  const { onPageChange } = props;

  // state: cookie 상태 //
  const [_, setCookie] = useCookies();

  // state: 유저 아이디 상태 //
  const [userId, setUserId] = useState<string>('');
  // state: 유저 비밀번호 상태 //
  const [userPassword, setUserPassword] = useState<string>('');
  // state: 유저 아이디 메세지 상태 //
  const [userIdMessage, setUserIdMessage] = useState<string>('');
  // state: 유저 비밀번호 메세지 상태 //
  const [userPasswordMessage, setUserPasswordMessage] = useState<string>('');

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: sign in response 처리 함수 //
  const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다' :
      responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      setUserPasswordMessage(message);
      return;
    }

    const { accessToken, expiration } = responseBody as SignInResponseDto;
    const expires = new Date(Date.now() + (expiration * 1000));
    setCookie(ACCESS_TOKEN, accessToken, { path: ROOT_PATH, expires });

    navigator(MAIN_ABSOLUTE_PATH);
  };

  // event handler: 유저 아이디 변경 이벤트 처리 //
  const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserId(value);
  };

  // event handler: 유저 비밀번호 변경 이벤트 처리 //
  const onUserPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserPassword(value);
  };

  // event handler: 로그인 버튼 클릭 이벤트 처리 //
  const onLoginButtonClick = () => {
    if (!userId) setUserIdMessage('아이디를 입력하세요.');
    if (!userPassword) setUserPasswordMessage('비밀번호를 입력하세요.');
    if (!userId || !userPassword) return;

    const requestBody: SignInRequestDto = {
      userId, userPassword
    }
    signInRequest(requestBody).then(signInResponse);
  };

  // event handler: sns 로그인 버튼 클릭 이벤트 처리 //
  const onSnsButtonClickHandler = (sns: 'kakao' | 'naver') => {
    window.location.href = SNS_SIGN_IN_URL(sns);
  };

  // effect: 아이디 혹은 비밀번호 변경시 실행할 함수 //
  useEffect(() => {
    setUserIdMessage('');
    setUserPasswordMessage('');
  }, [userId, userPassword]);

  // render: 로그인 컴포넌트 렌더링 //
  return (
    <div id='auth-login-container'>
      <div className='header'>Memories</div>
      <div className='input-container'>

        <InputBox type={'text'} label={'아이디'} value={userId} placeholder={'아이디를 입력해주세요.'} message={userIdMessage} isErrorMessage onChange={onUserIdChangeHandler} />

        <InputBox type={'password'} label={'비밀번호'} value={userPassword} placeholder={'비밀번호를 입력해주세요.'} message={userPasswordMessage} isErrorMessage onChange={onUserPasswordChangeHandler} />

      </div>
      <div className='button-container'>
        <div className='button primary fullwidth' onClick={onLoginButtonClick}>로그인</div>
        <div className='link' onClick={() => onPageChange('sign-up')}>회원가입</div>
      </div>
      <div className='divider'></div>
      <div className='sns-container'>
        <div className='sns-header'>SNS 로그인</div>
        <div className='sns-button-box'>
          <div className='sns-button kakao' onClick={() => onSnsButtonClickHandler('kakao')}></div>
          <div className='sns-button naver' onClick={() => onSnsButtonClickHandler('naver')}></div>
        </div>
      </div>
    </div>
  )
}
