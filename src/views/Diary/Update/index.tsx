import React, { ChangeEvent, useEffect, useState } from 'react'

import TextEditor from 'src/components/TextEditor';
import { Feeling, Weather } from 'src/types/aliases';

import './style.css';
import { getDiaryRequest, patchDiaryRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, DIARY_ABSOLUTE_PATH, DIARY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { PatchDiaryRequestDto } from 'src/apis/dto/request/diary';
import { ResponseDto } from 'src/apis/dto/response';
import { useNavigate, useParams } from 'react-router';
import { GetDiaryResponseDto } from 'src/apis/dto/response/diary';
import { useSignInUserStore } from 'src/stores';

// component: 일기 수정 화면 컴포넌트 //
export default function DiaryUpdate() {

  // state: 경로 변수 상태 //
  const { diaryNumber } = useParams();

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // state: 로그인 유저 아이디 상태 //
  const { userId } = useSignInUserStore();

  // state: 일기 수정 내용 상태 //
  const [writerId, setWriterId] = useState<string>('');
  const [writeDate, setWriteDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [feeling, setFeeling] = useState<Feeling | ''>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 날씨 컨텐츠 클래스 //
  const sunContentClass = 
    weather === '맑음' ? 'content active' : 'content pointer';
  const cloudContentClass = 
    weather === '흐림' ? 'content active' : 'content pointer';
  const rainContentClass = 
    weather === '비' ? 'content active' : 'content pointer';
  const snowContentClass = 
    weather === '눈' ? 'content active' : 'content pointer';
  const fogContentClass = 
    weather === '안개' ? 'content active' : 'content pointer';

  // variable: 날씨 아이콘 클래스 //
  const sunIconClass = 
    weather === '맑음' ? 'weather-icon sun-active' : 'weather-icon sun';
  const cloudIconClass = 
    weather === '흐림' ? 'weather-icon cloud-active' : 'weather-icon cloud';
  const rainIconClass = 
    weather === '비' ? 'weather-icon rain-active' : 'weather-icon rain';
  const snowIconClass = 
    weather === '눈' ? 'weather-icon snow-active' : 'weather-icon snow';
  const fogIconClass = 
    weather === '안개' ? 'weather-icon fog-active' : 'weather-icon fog';

  // variable: 기분 컨텐츠 클래스 //
  const happyContentClass = 
    feeling === '행복' ? 'content active' : 'content pointer';
  const funnyContentClass = 
    feeling === '즐거움' ? 'content active' : 'content pointer';
  const normalContentClass = 
    feeling === '보통' ? 'content active' : 'content pointer';
  const sadContentClass = 
    feeling === '슬픔' ? 'content active' : 'content pointer';
  const angryContentClass = 
    feeling === '분노' ? 'content active' : 'content pointer';

  // variable: 기분 아이콘 클래스 //
  const happyIconClass = 
    feeling === '행복' ? 'feeling-icon happy-active' : 'feeling-icon happy';
  const funnyIconClass = 
    feeling === '즐거움' ? 'feeling-icon funny-active' : 'feeling-icon funny';
  const normalIconClass = 
    feeling === '보통' ? 'feeling-icon normal-active' : 'feeling-icon normal';
  const sadIconClass = 
    feeling === '슬픔' ? 'feeling-icon sad-active' : 'feeling-icon sad';
  const angryIconClass = 
    feeling === '분노' ? 'feeling-icon angry-active' : 'feeling-icon angry';

  // variable: 일기 수정 가능 여부 //
  const isActive = weather !== '' && feeling !== '' && title !== '' && content !== '';
  // variable: 일기 수정 버튼 클래스 //
  const updateButtonClass = isActive ? 'button middle primary' : 'button middle disable';

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

    const { writerId, writeDate, weather, feeling, title, content } = responseBody as GetDiaryResponseDto;
    setWriterId(writerId);
    setWriteDate(writeDate);
    setWeather(weather);
    setFeeling(feeling);
    setTitle(title);
    setContent(content);
  };

  // function: patch diary response 처리 함수 //
  const patchDiaryResponse = (responseBody: ResponseDto | null) => {
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

    if (!diaryNumber) return;
    navigator(DIARY_VIEW_ABSOLUTE_PATH(diaryNumber));
  };

  // event handler: 날씨 변경 이벤트 처리 //
  const onWeatherChangeHandler = (weather: Weather) => {
    setWeather(weather);
  };

  // event handler: 기분 변경 이벤트 처리 //
  const onFeelingChangeHandler = (feeling: Feeling) => {
    setFeeling(feeling);
  };

  // event handler: 제목 변경 이벤트 처리 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  // event handler: 내용 변경 이벤트 처리 //
  const onContentChangeHandler = (content: string) => {
    setContent(content);
  };

  // event handler: 일기 수정 버튼 클릭 이벤트 처리 //
  const onUpdateButtonClickHandler = () => {
    if (!isActive || !accessToken || !diaryNumber) return;

    const requestBody: PatchDiaryRequestDto = {
      weather, feeling, title, content
    };
    patchDiaryRequest(diaryNumber, requestBody, accessToken).then(patchDiaryResponse);
  };

  // effect: 일기 번호가 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!accessToken || !diaryNumber) return;
    getDiaryRequest(diaryNumber, accessToken).then(getDiaryResponse);
  }, [diaryNumber]);
  
  // effect: 로그인 유저 아이디와 작성자 아이디가 변경될시 실행할 함수 //
  useEffect(() => {
    if (writerId && userId && writerId !== userId) {
      alert('권한이 없습니다.');
      navigator(DIARY_ABSOLUTE_PATH);
    }
  }, [writerId, userId]);

  // render: 일기 수정 화면 컴포넌트 렌더링 //
  return (
    <div id='diary-update-wrapper'>
      <div className='update-container'>
        <div className='update-title'>일기 수정</div>
        <div className='contents-container'>
          <div className='input-row-box'>
            <div className='title'>날짜</div>
            <div className='content'>{writeDate}</div>
          </div>
          <div className='input-row-box'>
            <div className='title'>날씨</div>
            <div className={sunContentClass} onClick={() => onWeatherChangeHandler('맑음')}>
              <div className={sunIconClass}></div>맑음
            </div>
            <div className={cloudContentClass} onClick={() => onWeatherChangeHandler('흐림')}>
              <div className={cloudIconClass}></div>흐림
            </div>
            <div className={rainContentClass} onClick={() => onWeatherChangeHandler('비')}>
              <div className={rainIconClass}></div>비
            </div>
            <div className={snowContentClass} onClick={() => onWeatherChangeHandler('눈')}>
              <div className={snowIconClass}></div>눈
            </div>
            <div className={fogContentClass} onClick={() => onWeatherChangeHandler('안개')}>
              <div className={fogIconClass}></div>안개
            </div>
          </div>
          <div className='input-row-box'>
            <div className='title'>기분</div>
            <div className={happyContentClass} onClick={() => onFeelingChangeHandler('행복')}>
              <div className={happyIconClass}></div>행복
            </div>
            <div className={funnyContentClass} onClick={() => onFeelingChangeHandler('즐거움')}>
              <div className={funnyIconClass}></div>즐거움
            </div>
            <div className={normalContentClass} onClick={() => onFeelingChangeHandler('보통')}>
              <div className={normalIconClass}></div>보통
            </div>
            <div className={sadContentClass} onClick={() => onFeelingChangeHandler('슬픔')}>
              <div className={sadIconClass}></div>슬픔
            </div>
            <div className={angryContentClass} onClick={() => onFeelingChangeHandler('분노')}>
              <div className={angryIconClass}></div>분노
            </div>
          </div>
          <div className='input-column-box'>
            <div className='title'>제목</div>
            <input type='text' value={title} placeholder='제목을 입력하세요' onChange={onTitleChangeHandler} />
          </div>
          <div className='input-column-box'>
            <div className='title'>내용</div>
            {content !== '' &&
            <TextEditor content={content} setContent={onContentChangeHandler} />
            }
          </div>
          <div className='button-box'>
            <div className={updateButtonClass} onClick={onUpdateButtonClickHandler}>수정 완료</div>
          </div>
        </div>
      </div>
    </div>
  )
}
