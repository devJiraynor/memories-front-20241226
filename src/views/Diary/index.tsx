import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, DIARY_VIEW_ABSOLUTE_PATH, DIARY_WRITE_ABSOLUTE_PATH } from 'src/constants';
import { Diary } from 'src/types/interfaces';
import { usePagination } from 'src/hooks';
import Pagination from 'src/components/Pagination';
import { getMyDiaryRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { GetMyDiaryResponseDto } from 'src/apis/dto/response/diary';
import { ResponseDto } from 'src/apis/dto/response';

// variable: 점보트론 컨텐츠 //
const JUMBOTRON_CONTENT = '일기 작성은 하루의 사건, 감정, 생각을 기록하여 단기 기억 능력 향상에 도움을 주며,\n장기 기억으로 변환하는데 도움을 줍니다.\n\n일기를 쓰는 행위 자체가 주의를 기울이는 활동이므로 주의력 및\n집중력 향상에 도움을 줍니다.\n\n일기 작성을 통해 단어를 떠올리고 문장을 조작하는 능력을 지속적으로\n연습하여 언어 능력 유지에 도움을 줍니다.';

// interface: 일기 테이블 레코드 컴포넌트 속성 //
interface TableItemProps {
  diary: Diary;
}

// component: 일기 테이블 레코드 컴포넌트 //
function TableItem({ diary }: TableItemProps) {

  const { diaryNumber, writeDate, title, weather, feeling } = diary;

  // variable: 기분 아이콘 클래스 //
  const feelingIconClass = `feeling-icon ${
    feeling === '보통' ? 'normal' :
    feeling === '행복' ? 'happy' :
    feeling === '즐거움' ? 'funny' :
    feeling === '슬픔' ? 'sad' :
    feeling === '분노' ? 'angry' : ''
  }`;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(DIARY_VIEW_ABSOLUTE_PATH(diaryNumber));
  };

  // render: 일기 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='tr' onClick={onClick}>
      <div className='td'>{writeDate}</div>
      <div className='td title'>{title}</div>
      <div className='td'>{weather}</div>
      <div className='td'>
        <div className='feeling-box'>
          <div className={feelingIconClass}></div>
          <div className='feeling-text'>{feeling}</div>
        </div>
      </div>
    </div>
  )
}

// component: 일기 메인 화면 컴포넌트 //
export default function DiaryMain() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList
  } = usePagination<Diary>();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get my diary response 처리 함수 //
  const getMyDiaryResponse = (responseBody: GetMyDiaryResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { diaries } = responseBody as GetMyDiaryResponseDto;
    setTotalList(diaries);

  };

  // event handler: 작성하기 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    navigator(DIARY_WRITE_ABSOLUTE_PATH);
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if (!accessToken) return;
    getMyDiaryRequest(accessToken).then(getMyDiaryResponse);
  }, []);

  // render: 일기 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='diary-main-wrapper'>
      <div className='jumbotron'>
        <div className='jumbotron-box'>
          <div className='jumbotron-content-box'>
            <div className='jumbotron-title'>일기</div>
            <div className='jumbotron-content'>{JUMBOTRON_CONTENT}</div>
          </div>
          <div className='jumbotron-button-box'>
            <div className='button primary middle' onClick={onWriteButtonClickHandler}>작성하기</div>
          </div>
        </div>
      </div>
      <div className='diary-list-container'>
        <div className='diary-list-table'>
          <div className='tr'>
            <div className='th'>날짜</div>
            <div className='th title'>제목</div>
            <div className='th'>날씨</div>
            <div className='th'>기분</div>
          </div>
          {viewList.map((diary, index) => <TableItem key={index} diary={diary} />)}
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