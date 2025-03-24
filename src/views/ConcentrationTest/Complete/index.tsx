import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { CONCENTRATION_TEST_ABSOLUTE_PATH } from 'src/constants';
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
      <div className='container'></div>
      <div className='test-result-container'></div>
    </div>
  )
}
