import React, { useEffect, useState } from 'react';

import './style.css';
import { Feeling, Weather } from 'src/types/aliases';
import { getDiaryRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, DIARY_ABSOLUTE_PATH } from 'src/constants';
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

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get diary response 처리 함수 //
  const getDiaryResponse = (responseBody: GetDiaryResponseDto | ResponseDto | null) => {
    
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
            <div className='content'>2025-03-20</div>
          </div>
          <div className='content-box'>
            <div className='title'>날씨</div>
            <div className='content'>
              <div className='weather-icon sun'></div>맑음
            </div>
          </div>
          <div className='content-box'>
            <div className='title'>기분</div>
            <div className='content'>
              <div className='feeling-icon happy'></div>행복
            </div>
          </div>
          <div className='content-box'>
            <div className='title'>제목</div>
            <div className='content'>오늘의 일기</div>
          </div>
          <div className='content-box'>
            <div className='title' style={{ alignSelf: 'start' }}>내용</div>
            <div className='content'>오늘의 일기<br/><br/><br/><br/>오늘의 일기</div>
          </div>
          <div className='button-box'>
            <div className='button middle error'>삭제</div>
            <div className='button middle second'>수정</div>
          </div>
        </div>
      </div>
    </div>
  )
}
