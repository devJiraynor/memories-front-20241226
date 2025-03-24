import React, { useEffect, useState } from 'react';
import './style.css';
import { CONCENTRATION_DESCRIPTION } from 'src/constants';
import { useConcentrationTestStore } from 'src/stores';

// variable: 전체 시간 (60초) //
const TOTAL_TIME = 60 * 1000;
// variable: 별 표시 시간 (0.25초) //
const STAR_TIME = 400;
// variable: 별 표시 횟수 //
const STAR_COUNT = 20;

// component: 집중력 검사 화면 컴포넌트 //
export default function ConcentrationTest() {

  // state: 검사 시작 여부 상태 //
  const [isStarted, setStarted] = useState<boolean>(false);
  // state: 검사 종료 여부 상태 //
  const [isFinish, setFinish] = useState<boolean>(false);
  // state: 별 표시 여부 상태 //
  const [isStarVisible, setStarVisible] = useState<boolean>(false);
  // state: 집중력 검사 결과 상태 //
  const { measurementScore, errorCount, increaseMeasurementScore, increaseErrorCount } = useConcentrationTestStore();

  // event handler: 검사 시작 버튼 클릭 이벤트 처리 //
  const onStartClickHandler = () => {
    setStarted(true);
  };

  // event handler: 아이콘 클릭 버튼 이벤트 처리 //
  const onIconClickHandler = () => {
    if (!isStarted || isFinish) return;
    if (isStarVisible) {
      increaseMeasurementScore();
      setStarVisible(false);
    }
    else {
      increaseErrorCount();
    }
  };

  // effect: 검사 시작 상태가 변경될 시 실행할 함수 //
  useEffect(() => {
    if (isStarted) {
      increaseMeasurementScore();
      increaseErrorCount();

      setTimeout(() => {
        setFinish(true);
        setStarted(false);
      }, TOTAL_TIME);

      setInterval(() => {
        setStarVisible(true);

        setTimeout(() => {
          setStarVisible(false);
        }, STAR_TIME);

      }, Math.floor(TOTAL_TIME / STAR_COUNT));
    }
  }, [isStarted]);

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
                <div className='success'>{measurementScore}/20</div>
              </div>
              <div className='result-box'>
                <div className='title'>오류</div>
                <div className='error'>{errorCount}</div>
              </div>
            </div>
            {isStarVisible ?
            <div className='star' onClick={onIconClickHandler}></div>:
            <div className='rectangle' onClick={onIconClickHandler}></div>
            }
          </div> :
          <div className='button primary middle' onClick={onStartClickHandler}>검사 시작</div>
          }
        </div>
      </div>
    </div>
  )
}
