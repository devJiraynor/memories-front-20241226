import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { DIARY_WRITE_ABSOLUTE_PATH } from 'src/constants';
import { Diary } from 'src/types/interfaces';

// variable: 점보트론 컨텐츠 //
const JUMBOTRON_CONTENT = '일기 작성은 하루의 사건, 감정, 생각을 기록하여 단기 기억 능력 향상에 도움을 주며,\n장기 기억으로 변환하는데 도움을 줍니다.\n\n일기를 쓰는 행위 자체가 주의를 기울이는 활동이므로 주의력 및\n집중력 향상에 도움을 줍니다.\n\n일기 작성을 통해 단어를 떠올리고 문장을 조작하는 능력을 지속적으로\n연습하여 언어 능력 유지에 도움을 줍니다.';

// interface: 일기 테이블 레코드 컴포넌트 속성 //
interface TableItemProps {
  diary: Diary;
}

// component: 일기 테이블 레코드 컴포넌트 //
function TableItem({ diary }: TableItemProps) {

  const { writeDate, title, weather, feeling } = diary;

  // render: 일기 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='tr'>
      <div className='td'>{writeDate}</div>
      <div className='td title'>{title}</div>
      <div className='td'>{weather}</div>
      <div className='td'>{feeling}</div>
    </div>
  )
}

// component: 일기 메인 화면 컴포넌트 //
export default function DiaryMain() {

  const [totalList, setTotalList] = useState<Diary[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalSection, setTotalSection] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [viewList, setViewList] = useState<Diary[]>([]);
  const [pageList, setPageList] = useState<number[]>([]);

  // function: 페이지 클래스 //
  const pageClass = (page: number) => currentPage === page ? 'page active' : 'page';

  // function: 전체 리스트 변경 함수 //
  const init = (totalList: Diary[]) => {
    const totalCount = totalList.length;
    setTotalCount(totalCount);
    const totalPage = Math.ceil(totalCount / 10);
    setTotalPage(totalPage);
    const totalSection = Math.ceil(totalPage / 10);
    setTotalSection(totalSection);

    setCurrentPage(1);
    setCurrentSection(1);
  };

  // function: 뷰 리스트 변경 함수 //
  const initViewList = (totalList: Diary[]) => {
    const totalCount = totalList.length;
    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10 > totalCount ? totalCount : currentPage * 10;
    const viewList: Diary[] = totalList.slice(startIndex, endIndex);
    setViewList(viewList);
  };

  // function: 페이지 리스트 변경 함수 //
  const initPageList = (totalPage: number) => {
    const startPage = 10 * currentSection - 9;
    const endPage = 10 * currentSection > totalPage ? totalPage : 10 * currentSection;
    const pageList = [];
    for (let page = startPage; page <= endPage; page++) {
      pageList.push(page);
    }
    setPageList(pageList);
  };

  // event handler: 이전 섹션 클릭 이벤트 처리 //
  const onPreSectionClickHandler = () => {
    if (currentSection <= 1) return;
    setCurrentSection(currentSection - 1);
    setCurrentPage((currentSection - 1) * 10);
  };

  // effect: 전체 리스트가 변경되면 실행할 함수 //
  useEffect(() => {
    if (totalList.length) init(totalList);
  }, [totalList]);

  // effect: 현재 페이지가 변경되면 실행할 함수 //
  useEffect(() => {
    if (currentPage) initViewList(totalList);
  }, [currentPage]);

  // effect: 현재 섹션이 변경되면 실행할 함수 //
  useEffect(() => {
    if (totalPage) initPageList(totalPage);
  }, [totalPage, currentSection]);

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 작성하기 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    navigator(DIARY_WRITE_ABSOLUTE_PATH);
  };

  useEffect(() => {
    setTotalList(MOCK);
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
          <div className='pagination-box'>
            <div className='pagination-button left' onClick={onPreSectionClickHandler}></div>
            <div className='pagination'>
              {pageList.map((page, index) => <div key={index} className={pageClass(page)}>{page}</div>)}
            </div>
            <div className='pagination-button right'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MOCK: Diary[] = [
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
  {
    writeDate: '2025-03-19',
    title: '내가 그린 기린 그림은 잘 그린 기린 그림이고, 네가 그린 그림은 잘 못그린 기린 그림이다. 안녕하세요. 잘가세요.',
    weather: '맑음',
    feeling: '행복'
  },
]