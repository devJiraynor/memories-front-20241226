import React, { ChangeEvent, useState } from 'react';
import { useSignInUserStore } from 'src/stores';
import DefaultProfile from 'src/assets/images/default-profile.png';
import Modal from 'src/components/Modal';
import InputBox from 'src/components/InputBox';

// component: 로그인 사용자 정보 수정 컴포넌트 //
function UserUpdate() {

  // state: 프로필 이미지 미리보기 상태 //
  const [previewProfile, setPrviewProfile] = useState<string | null>(null);
  // state: 수정 사용자 이름 상태 //
  const [updateName, setUpdateName] = useState<string>('');
  // state: 수정 사용자 성별 상태 //
  const [updateGender, setUpdateGender] = useState<string>('');
  // state: 수정 사용자 나이 상태 //
  const [updateAge, setUpdateAge] = useState<string>('');
  // state: 수정 주소 상태 //
  const [updateAddress, setUpdateAddress] = useState<string>('');
  // state: 수정 상세 주소 상태 //
  const [updateDetailAddress, setUpdateDetailAddress] = useState<string>('');
  // state: 사용자 프로필 이미지 상태 //
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // variable: 프로필 이미지 스타일 //
  const profileImageStyle = { cursor: 'pointer', backgroundImage: `url(${previewProfile ? previewProfile : DefaultProfile})` };

  // event handler: 사용자 이름 변경 이벤트 처리 //
  const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdateName(value);
  };

  // event handler: 사용자 성별 변경 이벤트 처리 //
  const onGenderChangeHandler = () => {
    
  };

  // event handler: 사용자 나이 변경 이벤트 처리 //
  const onAgeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdateAge(value);
  };

  // event handler: 사용자 상세 주소 변경 이벤트 처리 //
  const onDetailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdateDetailAddress(value);
  };


  // render: 로그인 사용자 정보 수정 렌더링 //
  return (
    <div className='user-update-container'>
      <div className='profile-image-box'>
        <div className='profile-image' style={profileImageStyle} />
      </div>
      <InputBox label='이름' value={updateName} placeholder='이름을 입력해주세요' type='text' message='' onChange={onNameChangeHandler} />



      <InputBox label='나이' value={updateAge} placeholder='나이를 입력해주세요' type='text' message='' onChange={onAgeChangeHandler} />


      <InputBox label='상세 주소' value={updateDetailAddress} placeholder='상세 주소를 입력해주세요' type='text' message='' onChange={onDetailAddressChangeHandler} />
      <div className='button primary fullwidth'>수정</div>
    </div>
  )
}

// component: 로그인 사용자 정보 컴포넌트 //
export default function UserInfo() {

  // state: 로그인 유저 정보 상태 //
  const { name, age, gender, address, detailAddress, profileImage } = useSignInUserStore();

  // state: 수정 모달 오픈 상태 //
  const [isUpdateOpen, setUpdateOpen] = useState<boolean>(true);

  // variable: 프로필 이미지 스타일 //
  const profileImageStyle = { backgroundImage: `url(${profileImage ? profileImage : DefaultProfile})` };
  // variable: 성별 //
  const genderText = !gender ? '' : gender === 'man' ? '남성' : '여성';
  // variable: 나이 //
  const ageText = !age ? '' : `${age} 세`;
  // variable: 주소 //
  const addressText = detailAddress ? `${address} ${detailAddress}` : address;

  // event handler: 수정 버튼 클릭 이벤트 처리 //
  const onUpdateOpenButtonClickHandler = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  // render: 로그인 사용자 정보 컴포넌트 렌더링 //
  return (
    <div className='user-info-container'>
      <div className='profile-image' style={profileImageStyle}></div>
      <div className='user-info-box'>
        <div className='user-info-row'>
          <div className='title'>이름</div>
          <div className='content'>{name}</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>성별</div>
          <div className='content'>{genderText}</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>나이</div>
          <div className='content'>{ageText}</div>
        </div>
        <div className='user-info-row'>
          <div className='title'>주소</div>
          <div className='content'>{addressText}</div>
        </div>
      </div>
      <div className='button second middle' onClick={onUpdateOpenButtonClickHandler}>수정</div>
      {isUpdateOpen && 
      <Modal 
        title='회원 정보 수정' 
        onClose={onUpdateOpenButtonClickHandler} 
      >
        <UserUpdate />
      </Modal>
      }
    </div>
  )
}
