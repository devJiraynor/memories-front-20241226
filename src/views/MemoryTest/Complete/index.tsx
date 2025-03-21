import React, { useEffect } from 'react';
import './style.css';
import { ACCESS_TOKEN, MEMORY_DESCRIPTION, MEMORY_TEST_ABSOLUTE_PATH } from 'src/constants';
import { useMemoryTestStore } from 'src/stores';
import { useNavigate } from 'react-router';
import { MemoryTest } from 'src/types/interfaces';
import { usePagination } from 'src/hooks';
import Pagination from 'src/components/Pagination';
import { getMemoryRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { GetMemoryResponseDto } from 'src/apis/dto/response/test';
import { ResponseDto } from 'src/apis/dto/response';

// interface: 기억력 검사 테이블 레코드 컴포넌트 속성 //
interface TableItemProps {
  memoryTest: MemoryTest
}

// component: 기억력 검사 테이블 레코드 컴포넌트 //
function TableItem({ memoryTest }: TableItemProps) {

  const { sequence, testDate, measurementTime, gap } = memoryTest;

  // variable: 차이 문자열 //
  const gapText = gap === null ? '' : gap > 0 ? `+${gap} 초` : `${gap} 초`; 

  // render: 기억력 검사 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='tr'>
      <div className='td sequence'>{sequence}</div>
      <div className='td test-date'>{testDate}</div>
      <div className='td measurement-time'>{measurementTime} 초</div>
      <div className='td gap'>{gapText}</div>
    </div>
  )
}

// component: 기억력 검사 완료 화면 컴포넌트 //
export default function MemoryTestComplete() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 기억력 검사 결과 상태 //
  const { measurementTime } = useMemoryTestStore();

  // state: 페이징 처리 관련 상태 //
  const { 
    currentPage, setCurrentPage,
    currentSection, setCurrentSection,
    totalSection,
    setTotalList,
    viewList, pageList 
  } = usePagination<MemoryTest>();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get memory response 처리 함수 //
  const getMemoryResponse = (responseBody: GetMemoryResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { memoryTests } = responseBody as GetMemoryResponseDto;
    setTotalList(memoryTests);
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if (!measurementTime) {
      navigator(MEMORY_TEST_ABSOLUTE_PATH);
      return;
    }
    if (!accessToken) return;
    getMemoryRequest(accessToken).then(getMemoryResponse);
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
          <div className='tr'>
            <div className='th sequence'>순번</div>
            <div className='th test-date'>검사 날짜</div>
            <div className='th measurement-time'>소요 시간</div>
            <div className='th gap'>차이</div>
          </div>
          {viewList.map((memoryTest, index) => 
          <TableItem key={index} memoryTest={memoryTest} />
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
