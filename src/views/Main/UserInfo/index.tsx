import React from 'react';
import { useSignInUserStore } from 'src/stores';
import DefaultProfile from 'src/assets/images/default-profile.png';

// component: 로그인 사용자 정보 컴포넌트 //
export default function UserInfo() {

  // state: 로그인 유저 정보 상태 //
  const { name, age, gender, address, detailAddress, profileImage } = useSignInUserStore();

  // variable: 프로필 이미지 스타일 //
  const profileImageStyle = { backgroundImage: `url(${profileImage ? profileImage : DefaultProfile})` };
  // variable: 성별 //
  const genderText = !gender ? '' : gender === 'man' ? '남성' : '여성';
  // variable: 나이 //
  const ageText = !age ? '' : `${age} 세`;
  // variable: 주소 //
  const addressText = detailAddress ? `${address} ${detailAddress}` : address;

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
      <div className='button second middle'>수정</div>
    </div>
  )
}
