import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { ACCESS_TOKEN, CONCENTRATION_DESCRIPTION, CONCENTRATION_TEST_COMPLETE_ABSOLUTE_PATH } from 'src/constants';
import { useConcentrationTestStore } from 'src/stores';
import { postConcentrationRequest } from 'src/apis';
import { PostConcentrationRequestDto } from 'src/apis/dto/request/test';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/dto/response';
import { useNavigate } from 'react-router';

// variable: 전체 시간 (60초) //
const TOTAL_TIME = 60 * 1000;
// variable: 별 표시 시간 (0.25초) //
const STAR_TIME = 400;
// variable: 별 표시 횟수 //
const STAR_COUNT = 20;

// component: 집중력 검사 화면 컴포넌트 //
export default function ConcentrationTest() {

  // state: 클릭 여부 참조 상태 //
  const clickRef = useRef<boolean>(false);

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 검사 시작 여부 상태 //
  const [isStarted, setStarted] = useState<boolean>(false);
  // state: 검사 종료 여부 상태 //
  const [isFinish, setFinish] = useState<boolean>(false);
  // state: 별 표시 여부 상태 //
  const [isStarVisible, setStarVisible] = useState<boolean>(false);
  // state: 집중력 검사 결과 상태 //
  const { measurementScore, errorCount, increaseMeasurementScore, increaseErrorCount, init, reset } = useConcentrationTestStore();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: post concentration response 처리 함수 //
  const postConcentrationResponse = (responseBody: ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    navigator(CONCENTRATION_TEST_COMPLETE_ABSOLUTE_PATH);
  };

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
      clickRef.current = true;
    }
    else {
      increaseErrorCount();
    }
  };

  // effect: 검사 시작 상태가 변경될 시 실행할 함수 //
  useEffect(() => {
    reset();
    if (isStarted) {
      init();

      setTimeout(() => {
        setFinish(true);
      }, TOTAL_TIME);

      setInterval(() => {
        setStarVisible(true);
        clickRef.current = false;

        setTimeout(() => {
          if(!clickRef.current) increaseErrorCount();
          setStarVisible(false);
        }, STAR_TIME);

      }, Math.floor(TOTAL_TIME / STAR_COUNT));
    }
  }, [isStarted]);

  // effect: 검사 종료 상태가 변경되면 실행할 함수 //
  useEffect(() => {
    if (!isFinish || !accessToken) return;

    const requestBody: PostConcentrationRequestDto = {
      measurementScore, errorCount
    };
    postConcentrationRequest(requestBody, accessToken).then(postConcentrationResponse);
  }, [isFinish]);

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
