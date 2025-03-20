import React, { ChangeEvent, useState } from 'react'
import './style.css';
import TextEditor from 'src/components/TextEditor';
import { Feeling, Weather } from 'src/types/aliases';

// component: 일기 작성 화면 컴포넌트 //
export default function DiaryWrite() {

  // state: 일기 작성 내용 상태 //
  const [weather, setWeather] = useState<Weather | ''>('');
  const [feeling, setFeeling] = useState<Feeling | ''>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

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

  // render: 일기 작성 화면 컴포넌트 렌더링 //
  return (
    <div id='diary-write-wrapper'>
      <div className='write-container'>
        <div className='write-title'>일기 작성</div>
        <div className='contents-container'>
          <div className='input-row-box'>
            <div className='title'>날짜</div>
            <div className='content'>2025-03-19</div>
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
            <div className='content' onClick={() => onFeelingChangeHandler('행복')}>
              <div className='feeling-icon happy'></div>행복
            </div>
            <div className='content' onClick={() => onFeelingChangeHandler('즐거움')}>
              <div className='feeling-icon funny'></div>즐거움
            </div>
            <div className='content' onClick={() => onFeelingChangeHandler('보통')}>
              <div className='feeling-icon normal'></div>보통
            </div>
            <div className='content' onClick={() => onFeelingChangeHandler('슬픔')}>
              <div className='feeling-icon sad'></div>슬픔
            </div>
            <div className='content' onClick={() => onFeelingChangeHandler('분노')}>
              <div className='feeling-icon angry'></div>분노
            </div>
          </div>
          <div className='input-column-box'>
            <div className='title'>제목</div>
            <input type='text' value={title} placeholder='제목을 입력하세요' onChange={onTitleChangeHandler} />
          </div>
          <div className='input-column-box'>
            <div className='title'>내용</div>
            <TextEditor content={content} setContent={onContentChangeHandler} />
          </div>
          <div className='button-box'>
            <div className='button middle disable'>작성 완료</div>
          </div>
        </div>
      </div>
    </div>
  )
}
