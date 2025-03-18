import React from 'react';
import './style.css';

// variable: 점보트론 컨텐츠 //
const JUMBOTRON_CONTENT = '일기 작성은 하루의 사건, 감정, 생각을 기록하여 단기 기억 능력 향상에 도움을 주며,\n장기 기억으로 변환하는데 도움을 줍니다.\n\n일기를 쓰는 행위 자체가 주의를 기울이는 활동이므로 주의력 및\n집중력 향상에 도움을 줍니다.\n\n일기 작성을 통해 단어를 떠올리고 문장을 조작하는 능력을 지속적으로\n연습하여 언어 능력 유지에 도움을 줍니다.';

// component: 일기 메인 화면 컴포넌트 //
export default function DiaryMain() {

  // render: 일기 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='diary-main-wrapper'>
      <div className='jumbotron'>
        <div className='jumbotron-box'>
          <div className='jumbotron-content-box'>
            <div className='jumbotron-title'>일기</div>
            <div className='jumbotron-content'>{JUMBOTRON_CONTENT}</div>
          </div>
          <div className='jumbotron-button-box'></div>
        </div>
      </div>
      <div className='diary-list-container'></div>
    </div>
  )
}
