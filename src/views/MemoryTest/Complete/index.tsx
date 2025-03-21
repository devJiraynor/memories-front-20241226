import React, { useEffect } from 'react';
import './style.css';
import { MEMORY_DESCRIPTION, MEMORY_TEST_ABSOLUTE_PATH } from 'src/constants';
import { useMemoryTestStore } from 'src/stores';
import { useNavigate } from 'react-router';

// component: 기억력 검사 완료 화면 컴포넌트 //
export default function MemoryTestComplete() {

  // state: 기억력 검사 결과 상태 //
  const { measurementTime } = useMemoryTestStore();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    // if (!measurementTime) {
    //   navigator(MEMORY_TEST_ABSOLUTE_PATH);
    //   return;
    // }
  }, []);

  // render: 기억력 검사 완료 화면 컴포넌트 렌더링 //
  return (
    <div id='memory-test-complete-wrapper'>
      <div className='container'>
        <div className='description-box'>
          <div className='title'>기억력 검사</div>
          <div className='description'>{MEMORY_DESCRIPTION}</div>
        </div>
        <div className='test-box'>
          <div className='title'>검사 완료</div>
          <div className='result'>{measurementTime} 초</div>
        </div>
      </div>
      <div className='test-result-container'>
        <div className='test-result-table'>
          <div className='tr'></div>
        </div>
        <div className='pagination-container'></div>
      </div>
    </div>
  )
}
