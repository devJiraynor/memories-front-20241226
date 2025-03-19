import React from 'react';
import './style.css';

// interface: 페이지네이션 컴포넌트 속성 //
interface Props {
  currentPage: number;
  currentSection: number;
  totalSection: number;
  pageList: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
}

// component: 페이지네이션 컴포넌트 //
export default function Pagination({
  currentPage, currentSection, totalSection, pageList,
  setCurrentPage, setCurrentSection
}: Props) {

  // function: 페이지 클래스 //
  const pageClass = (page: number) => currentPage === page ? 'page active' : 'page';

  // event handler: 페이지 변경 이벤트 처리 //
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  // event handler: 이전 섹션 클릭 이벤트 처리 //
  const onPreSectionClickHandler = () => {
    if (currentSection <= 1) return;
    setCurrentSection(currentSection - 1);
    setCurrentPage((currentSection - 1) * 10);
  };

  // event handler: 다음 섹션 클릭 이벤트 처리 //
  const onNextSectionClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentSection(currentSection + 1);
    setCurrentPage(currentSection * 10 + 1);
  };

  // render: 페이지네이션 컴포넌트 렌더링 //
  return (
    <div className='pagination-box'>
      <div className='pagination-button left' onClick={onPreSectionClickHandler}></div>
      <div className='pagination'>
        {pageList.map((page, index) => <div key={index} className={pageClass(page)} onClick={() => onPageClickHandler(page)}>{page}</div>)}
      </div>
      <div className='pagination-button right' onClick={onNextSectionClickHandler}></div>
    </div>
  )
}
