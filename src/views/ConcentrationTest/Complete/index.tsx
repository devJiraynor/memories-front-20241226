import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { CONCENTRATION_DESCRIPTION, CONCENTRATION_TEST_ABSOLUTE_PATH } from 'src/constants';
import { useConcentrationTestStore } from 'src/stores';

import './style.css';

// component: 집중력 검사 완료 화면 컴포넌트 //
export default function ConcentrationTestComplete() {

  // state: 집중력 검사 결과 상태 //
  const { measurementScore, errorCount } = useConcentrationTestStore();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    // if (measurementScore === -1 || errorCount === -1) {
    //   navigator(CONCENTRATION_TEST_ABSOLUTE_PATH);
    // }
  } ,[]);

  // render: 집중력 검사 완료 화면 컴포넌트 렌더링 //
  return (
    <div id='conc-complete-wrapper'>
      <div className='container'>
        <div className='description-box'>
          <div className='title'>집중력 검사</div>
          <div className='description'>{CONCENTRATION_DESCRIPTION}</div>
        </div>
        <div className='test-box'>
          <div className='result-container'>
            <div className='title'>검사 완료</div>
            <div className='result-row'>
              <div className='result-box'>
                <div className='title'>성공</div>
                <div className='success'>{measurementScore}/20</div>
              </div>
              <div className='result-box'>
                <div className='title'>오류</div>
                <div className='error'>{errorCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='test-result-container'>
        <div className='test-result-table'>
          <div className='tr'>
            <div className='th conc-sequence'>순번</div>
            <div className='th conc-test-date'>검사 날짜</div>
            <div className='th measurement-score'>성공</div>
            <div className='th score-gap'>성공 차이</div>
            <div className='th error-count'>오류</div>
            <div className='th error-gap'>오류 차이</div>
          </div>
        </div>
      </div>
    </div>
  )
}
