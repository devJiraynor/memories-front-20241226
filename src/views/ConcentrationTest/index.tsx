import React, { useState } from 'react';
import './style.css';
import { CONCENTRATION_DESCRIPTION } from 'src/constants';

// component: 집중력 검사 화면 컴포넌트 //
export default function ConcentrationTest() {

  // state: 검사 시작 여부 상태 //
  const [isStarted, setStarted] = useState<boolean>(false);

  // event handler: 검사 시작 버튼 클릭 이벤트 처리 //
  const onStartClickHandler = () => {
    setStarted(true);
  };

  // render: 집중력 검사 화면 컴포넌트 렌더링 //
  return (
    <div id='conc-test-wrapper'>
      <div className='container'>
        <div className='description-box'>
          <div className='title'>집중력 검사</div>
          <div className='description'>{CONCENTRATION_DESCRIPTION}</div>
        </div>
        <div className='test-box'>
          {isStarted ? 
          <div className='test-container'>
            <div className='result-row'>
              <div className='result-box'>
                <div className='title'>성공</div>
                <div className='success'>0/20</div>
              </div>
              <div className='result-box'>
                <div className='title'>오류</div>
                <div className='error'>0</div>
              </div>
            </div>
            <div className='rectangle'></div>
          </div> :
          <div className='button primary middle' onClick={onStartClickHandler}>검사 시작</div>
          }
        </div>
      </div>
    </div>
  )
}
