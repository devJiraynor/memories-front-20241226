import React from 'react'
import './style.css';
import TextEditor from 'src/components/TextEditor';

// component: 일기 작성 화면 컴포넌트 //
export default function DiaryWrite() {

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
            <div className='content'>
              <div className='weather-icon sun'></div>맑음
            </div>
            <div className='content'>
              <div className='weather-icon cloud'></div>흐림
            </div>
            <div className='content'>
              <div className='weather-icon rain'></div>비
            </div>
            <div className='content'>
              <div className='weather-icon snow'></div>눈
            </div>
            <div className='content'>
              <div className='weather-icon fog'></div>안개
            </div>
          </div>
          <div className='input-row-box'>
            <div className='title'>기분</div>
            <div className='content'>
              <div className='feeling-icon happy'></div>행복
            </div>
            <div className='content'>
              <div className='feeling-icon funny'></div>즐거움
            </div>
            <div className='content'>
              <div className='feeling-icon normal'></div>보통
            </div>
            <div className='content'>
              <div className='feeling-icon sad'></div>슬픔
            </div>
            <div className='content'>
              <div className='feeling-icon angry'></div>분노
            </div>
          </div>
          <div className='input-column-box'>
            <div className='title'>제목</div>
            <input placeholder='제목을 입력하세요' />
          </div>
          <div className='input-column-box'>
            <div className='title'>내용</div>
            <TextEditor />
          </div>
        </div>
      </div>
    </div>
  )
}
