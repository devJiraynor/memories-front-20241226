import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

import Layout from './layouts/Layout';
import Auth from './views/Auth';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, AUTH_PATH, CONCENTRATION_TEST_COMPLETE_PATH, CONCENTRATION_TEST_PATH, DIARY_PATH, DIARY_UPDATE_PATH, DIARY_VIEW_PATH, DIARY_WRITE_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, MEMORY_TEST_COMPLETE_PATH, MEMORY_TEST_PATH, OTHERS_PATH } from './constants';

import './App.css';

// Router 구성
// - /auth : 로그인 및 회원가입 페이지

// - /main : 메인 페이지

// - /memory-test : 기억력 검사 페이지
// - /memory-test/complete : 기억력 검사 완료 페이지

// - /concentration-test : 집중력 검사 페이지
// - /concentration-test/complete : 집중력 검사 완료 페이지

// - /diary : 일기 메인 페이지
// - /diary/write : 일기 작성 페이지
// - /diary/:diaryNumber : 일기 보기 페이지
// - /diary/:diaryNumber/update : 일기 수정 페이지

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={AUTH_PATH} element={<Auth />} />

      <Route element={<Layout />}>
        <Route path={MAIN_PATH} element={<>메인 페이지</>} />

        <Route path={MEMORY_TEST_PATH}>
          <Route index element={<>기억력 검사 페이지</>} />
          <Route path={MEMORY_TEST_COMPLETE_PATH} element={<>기억력 검사 완료 페이지</>} />
        </Route>

        <Route path={CONCENTRATION_TEST_PATH}>
          <Route index element={<>집중력 검사 페이지</>} />
          <Route path={CONCENTRATION_TEST_COMPLETE_PATH} element={<>집중력 검사 완료 페이지</>} />
        </Route>

        <Route path={DIARY_PATH}>
          <Route index element={<>일기 메인 페이지</>} />
          <Route path={DIARY_WRITE_PATH} element={<>일기 작성 페이지</>} />
          <Route path={DIARY_VIEW_PATH}>
            <Route index element={<>일기 보기 페이지</>} />
            <Route path={DIARY_UPDATE_PATH} element={<>일기 수정 페이지</>} />
          </Route>
        </Route>

        <Route path={OTHERS_PATH} element={<>404 페이지</>} />
      </Route>
    </Routes>
  );
}

export default App;

// component: Root 경로 컴포넌트 //
function Index() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트가 렌더링될 때 실행할 함수 //
  useEffect(() => {
    if (cookies[ACCESS_TOKEN]) navigator(MAIN_ABSOLUTE_PATH);
    else navigator(AUTH_ABSOLUTE_PATH);
  }, []);
  
  // render: Root 경로 컴포넌트 렌더링 //
  return null;
}
