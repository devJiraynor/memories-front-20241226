import React, { useEffect, useState } from 'react';

import './style.css';
import { Feeling, Weather } from 'src/types/aliases';
import { deleteDiaryRequest, getDiaryRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, DIARY_ABSOLUTE_PATH, DIARY_UPDATE_ABSOLUTE_PATH } from 'src/constants';
import { useNavigate, useParams } from 'react-router';
import { GetDiaryResponseDto } from 'src/apis/dto/response/diary';
import { ResponseDto } from 'src/apis/dto/response';

// component: 일기 상세 화면 컴포넌트 //
export default function DiaryDetail() {

  // state: 경로 변수 상태 //
  const { diaryNumber } = useParams();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 일기 내용 상태 //
  const [writeDate, setWriteDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [feeling, setFeeling] = useState<Feeling | ''>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 날씨 아이콘 클래스 //
  const weatherIconClass = 
    weather === '맑음' ? 'weather-icon sun' :
    weather === '흐림' ? 'weather-icon cloud' :
    weather === '비' ? 'weather-icon rain' :
    weather === '눈' ? 'weather-icon snow' :
    weather === '안개' ? 'weather-icon fog' : '';

  // variable: 기분 아이콘 클래스 //
  const feelingIconClass =
    feeling === '행복' ? 'feeling-icon happy' :
    feeling === '즐거움' ? 'feeling-icon funny' :
    feeling === '보통' ? 'feeling-icon normal' :
    feeling === '슬픔' ? 'feeling-icon sad' :
    feeling === '분노' ? 'feeling-icon angry' : '';

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get diary response 처리 함수 //
  const getDiaryResponse = (responseBody: GetDiaryResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' :
      responseBody.code === 'ND' ? '존재하지 않는 일기입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';

    if (!isSuccess) {
      alert(message);
      navigator(DIARY_ABSOLUTE_PATH);
      return;
    }

    const { writeDate, weather, feeling, title, content } = responseBody as GetDiaryResponseDto;
    setWriteDate(writeDate);
    setWeather(weather);
    setFeeling(feeling);
    setTitle(title);
    setContent(content);
  };

  // function: delete diary response 처리 함수 //
  const deleteDiaryResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' :
      responseBody.code === 'ND' ? '존재하지 않는 일기입니다.' :
      responseBody.code === 'NP' ? '권한이 없습니다.' : '';
    
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    alert('삭제에 성공했습니다.');
    navigator(DIARY_ABSOLUTE_PATH);
  };

  // event handler: 삭제 버튼 클릭 이벤트 처리 //
  const onDeleteClickHandler = () => {
    if (!diaryNumber || !accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    deleteDiaryRequest(diaryNumber, accessToken).then(deleteDiaryResponse);
  };

  // event handler: 수정 버튼 클릭 이벤트 처리 //
  const onUpdateClickHandler = () => {
    if (!diaryNumber) return;
    navigator(DIARY_UPDATE_ABSOLUTE_PATH(diaryNumber));
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
    if(!diaryNumber) {
      navigator(DIARY_ABSOLUTE_PATH);
      return;
    }

    getDiaryRequest(diaryNumber, accessToken).then(getDiaryResponse);
  }, []);

  // render: 일기 상세 화면 컴포넌트 렌더링 //
  return (
    <div id='diary-detail-wrapper'>
      <div className='detail-container'>
        <div className='detail-title'>일기</div>
        <div className='contents-container'>
          <div className='content-box'>
            <div className='title'>날짜</div>
            <div className='content'>{writeDate}</div>
          </div>
          <div className='content-box'>
            <div className='title'>날씨</div>
            <div className='content'>
              <div className={weatherIconClass}></div>{weather}
            </div>
          </div>
          <div className='content-box'>
            <div className='title'>기분</div>
            <div className='content'>
              <div className={feelingIconClass}></div>{feeling}
            </div>
          </div>
          <div className='content-box'>
            <div className='title'>제목</div>
            <div className='content'>{title}</div>
          </div>
          <div className='content-box'>
            <div className='title' style={{ alignSelf: 'start' }}>내용</div>
            <div className='content' style={{ flex: 1, display: 'block' }} dangerouslySetInnerHTML={{ __html: content }} />
            <hr/>
          </div>
          <div className='button-box'>
            <div className='button middle error' onClick={onDeleteClickHandler}>삭제</div>
            <div className='button middle second' onClick={onUpdateClickHandler}>수정</div>
          </div>
        </div>
      </div>
    </div>
  )
}
