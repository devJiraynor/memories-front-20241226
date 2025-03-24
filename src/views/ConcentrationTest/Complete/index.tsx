import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, CONCENTRATION_DESCRIPTION, CONCENTRATION_TEST_ABSOLUTE_PATH } from 'src/constants';
import { useConcentrationTestStore } from 'src/stores';

import './style.css';
import { ConcentrationTest } from 'src/types/interfaces';
import { getConcentrationRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { GetConcentrationResponseDto } from 'src/apis/dto/response/test';
import { ResponseDto } from 'src/apis/dto/response';
import { usePagination } from 'src/hooks';
import Pagination from 'src/components/Pagination';

// interface: 집중력 검사 테이블 레코드 컴포넌트 속성 //
interface TableItemProps {
  concentrationTest: ConcentrationTest
}

// component: 집중력 검사 테이블 레코드 컴포넌트 //
function TableItem({ concentrationTest }: TableItemProps) {

  const { sequence, testDate, measurementScore, scoreGap, errorCount, errorGap } = concentrationTest;

  // variable: 성공 차이 문자열 //
  const scoreGapText = scoreGap === null ? '' : scoreGap > 0 ? `+${scoreGap}` : scoreGap;
  // variable: 오류 차이 문자열 //
  const errorGapText = errorGap === null ? '' : errorGap > 0 ? `+${errorGap}` : errorGap;

  // render: 집중력 검사 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='tr'>
      <div className='td conc-sequence'>{sequence}</div>
      <div className='td conc-test-date'>{testDate}</div>
      <div className='td measurement-score'>{measurementScore}</div>
      <div className='td score-gap'>{scoreGapText}</div>
      <div className='td error-count'>{errorCount}</div>
      <div className='td error-gap'>{errorGapText}</div>
    </div>
  )
}

// component: 집중력 검사 완료 화면 컴포넌트 //
export default function ConcentrationTestComplete() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 집중력 검사 결과 상태 //
  const { measurementScore, errorCount } = useConcentrationTestStore();

  // state: 페이징 처리 관련 상태 //
  const {
    currentPage, setCurrentPage,
    currentSection, setCurrentSection,
    totalSection,
    setTotalList,
    viewList, pageList
  } = usePagination<ConcentrationTest>();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get concentration response 처리 함수 //
  const getConcentrationResponse = (responseBody: GetConcentrationResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
    
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { concentrationTests } = responseBody as GetConcentrationResponseDto;
    setTotalList(concentrationTests);
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if (measurementScore === -1 || errorCount === -1) {
      navigator(CONCENTRATION_TEST_ABSOLUTE_PATH);
    }
    if (!accessToken) return;
    getConcentrationRequest(accessToken).then(getConcentrationResponse);
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
          {viewList.map((conc, index) => 
          <TableItem key={index} concentrationTest={conc} />
          )}
        </div>
        <div className='pagination-container'>
          {totalSection !== 0 &&
          <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            totalSection={totalSection}
            pageList={pageList}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
          />
          }
        </div>
      </div>
    </div>
  )
}
