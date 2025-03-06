import React from 'react';
import { Route, Routes } from 'react-router';

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
      <Route path={'/auth'} element={<>로그인 회원가입 페이지</>} />

      <Route path={'/main'} element={<>메인 페이지</>} />

      <Route path={'/memory-test'}>
        <Route index element={<>기억력 검사 페이지</>} />
        <Route path={'complete'} element={<>기억력 검사 완료 페이지</>} />
      </Route>

      <Route path={'/concentration-test'}>
        <Route index element={<>집중력 검사 페이지</>} />
        <Route path={'complete'} element={<>집중력 검사 완료 페이지</>} />
      </Route>

      <Route path={'/diary'}>
        <Route index element={<>일기 메인 페이지</>} />
        <Route path={'write'} element={<>일기 작성 페이지</>} />
        <Route path={':diaryNumber'}>
          <Route index element={<>일기 보기 페이지</>} />
          <Route path={'update'} element={<>일기 수정 페이지</>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
