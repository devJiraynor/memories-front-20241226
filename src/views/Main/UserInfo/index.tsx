import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSignInUserStore } from 'src/stores';
import DefaultProfile from 'src/assets/images/default-profile.png';
import Modal from 'src/components/Modal';
import InputBox from 'src/components/InputBox';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

// component: 로그인 사용자 정보 수정 컴포넌트 //
function UserUpdate() {

  // state: 로그인 사용자 정보 //
  const { profileImage, name, gender, age, address, detailAddress } = useSignInUserStore();

  // state: 파일 인풋 참조 상태 //
  const fileRef = useRef<HTMLInputElement | null>(null);

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
  // variable: 남성 클래스 //
  const manClass = updateGender === 'man' ? 'check-item active' : 'check-item';
  // variable: 여성 클래스 //
  const womanClass = updateGender === 'woman' ? 'check-item active' : 'check-item';

  // function: 다음 포스트 코드 팝업 오픈 함수 //
  const open = useDaumPostcodePopup();

  // function: 다음 포스트 코드 완료 처리 함수 //
  const daumPostCompleteHandler = (data: Address) => {
    const { address } = data;
    setUpdateAddress(address);
  };

  // event handler: 프로필 사진 클릭 이벤트 처리 //
  const onProfileClickHandler = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };
  
  // event handler: 파일 인풋 변경 이벤트 처리 //
  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || !files.length) return;

    const file = files[0];
    setProfileImageFile(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPrviewProfile(fileReader.result as string);
    };
  };

  // event handler: 사용자 이름 변경 이벤트 처리 //
  const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdateName(value);
  };

  // event handler: 사용자 성별 변경 이벤트 처리 //
  const onGenderChangeHandler = (gender: string) => {
    setUpdateGender(gender);
  };

  // event handler: 사용자 나이 변경 이벤트 처리 //
  const onAgeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regexp = /^$|^[1-9][0-9]{0,2}$/;
    const isNumber = regexp.test(value);
    if (!isNumber) return;
    setUpdateAge(value);
  };

  // event handler: 주소 검색 버튼 클릭 이벤트 처리 //
  const onSearchAddressClickHandler = () => {
    open({ onComplete: daumPostCompleteHandler });
  };

  // event handler: 사용자 상세 주소 변경 이벤트 처리 //
  const onDetailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdateDetailAddress(value);
  };

  // event handler: 수정 버튼 클릭 이벤트 처리 //
  const onUpdateButtonClick = () => {
    const message = 
      !updateName ? '이름을 입력하세요.' :
      !updateAge ? '나이를 입력하세요.' : 
      !updateGender ? '성별을 선택하세요.' : 
      !updateAddress ? '주소를 입력하세요.' : '';
    const isCheck = updateName && updateAge && updateGender && updateAddress;
    if (!isCheck) {
      alert(message);
      return;
    }

  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    setPrviewProfile(profileImage);
    setUpdateName(name);
    setUpdateGender(gender ? gender : '');
    setUpdateAge(age ? String(age) : '');
    setUpdateAddress(address);
    setUpdateDetailAddress(detailAddress ? detailAddress : '');
  }, []);

  // render: 로그인 사용자 정보 수정 렌더링 //
  return (
    <div className='user-update-container'>
      <div className='profile-image-box'>
        <div className='profile-image' style={profileImageStyle} onClick={onProfileClickHandler} />
        <input ref={fileRef} style={{ display: 'none' }} type='file' accept='image/png, image/jpeg' onChange={onFileChangeHandler} />
      </div>
      <InputBox label='이름' value={updateName} placeholder='이름을 입력해주세요' type='text' message='' onChange={onNameChangeHandler} />

      <div className='check-box'>
        <div className='label'>성별</div>
        <div className='check-item-box'>
          <div className={manClass} onClick={() => onGenderChangeHandler('man')}>남성</div>
          <div className={womanClass} onClick={() => onGenderChangeHandler('woman')}>여성</div>
        </div>
      </div>

      <InputBox label='나이' value={updateAge} placeholder='나이를 입력해주세요' type='text' message='' onChange={onAgeChangeHandler} />

      <InputBox label='주소' value={updateAddress} placeholder='주소를 입력해주세요' type='text' message='' onChange={() => {}} readOnly isButtonActive buttonName='주소 검색' onButtonClick={onSearchAddressClickHandler} />

      <InputBox label='상세 주소' value={updateDetailAddress} placeholder='상세 주소를 입력해주세요' type='text' message='' onChange={onDetailAddressChangeHandler} />

      <div className='button primary fullwidth' onClick={onUpdateButtonClick}>수정</div>
    </div>
  )
}

// component: 로그인 사용자 정보 컴포넌트 //
export default function UserInfo() {

  // state: 로그인 유저 정보 상태 //
  const { name, age, gender, address, detailAddress, profileImage } = useSignInUserStore();

  // state: 수정 모달 오픈 상태 //
  const [isUpdateOpen, setUpdateOpen] = useState<boolean>(false);

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
