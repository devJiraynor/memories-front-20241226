import React, { ChangeEvent, useState } from 'react';
import './style.css';
import { AuthPage } from 'src/types/aliases';
import InputBox from 'src/components/InputBox';

// interface: 회원가입 컴포넌트 속성 //
interface Props {
  onPageChange: (page: AuthPage) => void;
}

// component: 회원가입 컴포넌트 //
export default function SignUp(props: Props) {

  const { onPageChange } = props;

  // state: 사용자 이름 상태 //
  const [userName, setUserName] = useState<string>('');
  // state: 사용자 아이디 상태 //
  const [userId, setUserId] = useState<string>('');
  // state: 사용자 비밀번호 상태 //
  const [userPassword, setUserPassword] = useState<string>('');
  // state: 사용자 비밀번호 확인 상태 //
  const [userPasswordCheck, setUserPasswordCheck] = useState<string>('');
  // state: 사용자 주소 상태 //
  const [userAddress, setUserAddress] = useState<string>('');
  // state: 사용자 상세 주소 상태 //
  const [userDetailAddress, setUserDetailAddress] = useState<string>('');

  // state: 사용자 이름 메세지 상태 //
  const [userNameMessage, setUserNameMessage] = useState<string>('');
  // state: 사용자 아이디 메세지 상태 //
  const [userIdMessage, setUserIdMessage] = useState<string>('');
  // state: 사용자 비밀번호 메세지 상태 //
  const [userPasswordMessage, setUserPasswordMessage] = useState<string>('');
  // state: 사용자 비밀번호 확인 메세지 상태 //
  const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState<string>('');
  // state: 사용자 주소 메세지 상태 //
  const [userAddressMessage, setUserAddressMessage] = useState<string>('');

  // state: 사용자 아이디 메세지 에러 상태 //
  const [userIdMessageError, setUserIdMessageError] = useState<boolean>(false);

  // event handler: 사용자 이름 변경 이벤트 처리 //
  const onUserNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
  };

  // event handler: 사용자 아이디 변경 이벤트 처리 //
  const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserId(value);
  };

  // event handler: 사용자 비밀번호 변경 이벤트 처리 //
  const onUserPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserPassword(value);
  };

  // event handler: 사용자 비밀번호 확인 변경 이벤트 처리 //
  const onUserPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserPasswordCheck(value);
  };

  // event handler: 사용자 주소 변경 이벤트 처리 //
  const onUserAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserAddress(value);
  };

  // event handler: 사용자 상세 주소 변경 이벤트 처리 //
  const onUserDetailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserDetailAddress(value);
  };

  // event handler: 중복 확인 버튼 클릭 이벤트 처리 //
  const onCheckUserIdClickHandler = () => {

  };

  // event handler: 주소 검색 버튼 클릭 이벤트 처리 //
  const onSearchAddressClickHandler = () => {

  };

  // variable: 중복 확인 버튼 활성화 //
  const isUserIdCheckButtonActive = userId !== ''; 

  // render: 회원가입 컴포넌트 렌더링 //
  return (
    <div id='auth-sign-up-container'>
      <div className='header'>Memories</div>
      <div className='sns-container'>
        <div className='sns-header'>SNS 회원가입</div>
        <div className='sns-button-box'>
          <div className='sns-button kakao'></div>
          <div className='sns-button naver'></div>
        </div>
      </div>
      <div className='divider'></div>
      <div className='input-container'>

        <InputBox label={'이름'} type={'text'} value={userName} placeholder={'이름을 입력해주세요.'} onChange={onUserNameChangeHandler} message={userNameMessage} isErrorMessage />

        <InputBox label={'아이디'} type={'text'} value={userId} placeholder={'아이디를 입력해주세요.'} onChange={onUserIdChangeHandler} message={userIdMessage} buttonName={'중복 확인'} onButtonClick={onCheckUserIdClickHandler} isErrorMessage={userIdMessageError} isButtonActive={isUserIdCheckButtonActive} />

        <InputBox label={'비밀번호'} type={'password'} value={userPassword} placeholder={'비밀번호를 입력해주세요.'} onChange={onUserPasswordChangeHandler} message={userPasswordMessage} isErrorMessage />

        <InputBox label={'비밀번호 확인'} type={'password'} value={userPasswordCheck} placeholder={'비밀번호를 입력해주세요.'} onChange={onUserPasswordCheckChangeHandler} message={userPasswordCheckMessage} isErrorMessage />

        <InputBox label={'주소'} type={'text'} value={userAddress} placeholder={'주소를 입력해주세요.'} onChange={onUserAddressChangeHandler} message={userAddressMessage} buttonName={'주소 검색'} onButtonClick={onSearchAddressClickHandler} isErrorMessage isButtonActive readOnly />

        <InputBox label={'상세 주소'} type={'text'} value={userDetailAddress} placeholder={'상세 주소를 입력해주세요.'} onChange={onUserDetailAddressChangeHandler} message={''} />

      </div>
      <div className='button-container'>
        <div className='button disable fullwidth'>회원가입</div>
        <div className='link' onClick={() => onPageChange('sign-in')}>로그인</div>
      </div>
    </div>
  )
}
