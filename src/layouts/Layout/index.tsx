import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, CONCENTRATION_TEST_ABSOLUTE_PATH, DIARY_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MEMORY_TEST_ABSOLUTE_PATH, ROOT_PATH } from 'src/constants';

import './style.css';
import { useCookies } from 'react-cookie';
import { getSignInUserRequest } from 'src/apis';
import { GetSignInUserResponseDto } from 'src/apis/dto/response/user';
import { ResponseDto } from 'src/apis/dto/response';
import { useSignInUserStore } from 'src/stores';
import { useSignInUser } from 'src/hooks';

// component: 공통 레이아웃 컴포넌트 //
export default function Layout() {

  // state: 경로 상태 //
  const { pathname } = useLocation();

  // state: cookie 상태 //
  const [cookies, _, removeCookie] = useCookies();

  // state: My Content List 요소 참조 //
  const myContentListRef = useRef<HTMLDivElement | null>(null);

  // state: 로그인 유저 정보 상태 //
  const { resetSignInUser } = useSignInUserStore();

  // state: My Content 드롭다운 상태 //
  const [showMyContent, setShowMyContent] = useState<boolean>(false);

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: 로그인 유저 정보 불러오기 함수 //
  const getSignInUser = useSignInUser();

  // variable: 기억력 검사 클래스 //
  const memoryTestClass = pathname.startsWith(MEMORY_TEST_ABSOLUTE_PATH) ? 'navigation-item active' : 'navigation-item';
  // variable: 집중력 검사 클래스 //
  const concentrationTestClass = pathname.startsWith(CONCENTRATION_TEST_ABSOLUTE_PATH) ? 'navigation-item active' : 'navigation-item';

  // event handler: 홈 클릭 이벤트 처리 //
  const onHomeClickHandler = () => {
    navigator(MAIN_ABSOLUTE_PATH);
  };

  // event handler: 기억력 검사 클릭 이벤트 처리 //
  const onMemoryTestClickHandler = () => {
    navigator(MEMORY_TEST_ABSOLUTE_PATH);
  };

  // event handler: 집중력 검사 클릭 이벤트 처리 //
  const onConcentrationTestClickHandler = () => {
    navigator(CONCENTRATION_TEST_ABSOLUTE_PATH);
  };

  // event handler: 일기 클릭 이벤트 처리 //
  const onDiaryClickHandler = () => {
    navigator(DIARY_ABSOLUTE_PATH);
  };

  // event handler: My Content 클릭 이벤트 처리 //
  const onMyContentClickHandler = () => {
    setShowMyContent(!showMyContent);
  };

  // event handler: 로그아웃 클릭 이벤트 처리 //
  const onSignOutClickHandler = () => {
    removeCookie(ACCESS_TOKEN, { path: ROOT_PATH });
    resetSignInUser();
  };

  // effect: cookie의 accessToken이 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!cookies[ACCESS_TOKEN]) return;
    getSignInUser();
  }, [cookies[ACCESS_TOKEN]]);

  // effect: cookie의 accessToken과 경로가 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!cookies[ACCESS_TOKEN]) navigator(AUTH_ABSOLUTE_PATH);
  }, [cookies[ACCESS_TOKEN], pathname]);

  // effect: My Content 드롭다운 상태가 변경될시 실행할 함수 //
  useEffect(() => {
    const onOutsideClickHandler = (event: any) => {
      if (
        myContentListRef.current && 
        !myContentListRef.current.contains(event.target as Node)
      ) {
        setShowMyContent(false);
      }
    };

    if (!showMyContent) return;

    document.addEventListener('mousedown', onOutsideClickHandler);

  }, [showMyContent]);

  // render: 공통 레이아웃 컴포넌트 렌더링 //
  return (
    <div id='layout-wrapper'>
      <div id='top-bar'>
        <div className='navigation'>
          <div className='title' onClick={onHomeClickHandler}>Memories</div>
          <div className='navigation-list'>
            <div className={memoryTestClass} onClick={onMemoryTestClickHandler}>기억력 검사</div>
            <div className={concentrationTestClass} onClick={onConcentrationTestClickHandler}>집중력 검사</div>
          </div>
        </div>
        <div className='my-content' onClick={onMyContentClickHandler}>
          {showMyContent &&
          <div ref={myContentListRef} className='my-content-list'>
            <div className='my-content-item' onClick={onDiaryClickHandler}>일기</div>
            <div className='my-content-item' onClick={onSignOutClickHandler}>로그아웃</div>
          </div>
          }
        </div>
      </div>
      <div id='main'>
        <Outlet />
      </div>
    </div>
  )
}
