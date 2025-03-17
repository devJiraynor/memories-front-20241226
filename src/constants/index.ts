// variable: 상대 path 상수 //
export const ROOT_PATH = '/';
export const AUTH_PATH = 'auth';
export const MAIN_PATH = 'main';
export const MEMORY_TEST_PATH = 'memory-test';
export const MEMORY_TEST_COMPLETE_PATH = 'complete';
export const CONCENTRATION_TEST_PATH = 'concentration-test';
export const CONCENTRATION_TEST_COMPLETE_PATH = 'complete';
export const DIARY_PATH = 'diary';
export const DIARY_WRITE_PATH = 'write';
export const DIARY_VIEW_PATH = ':diaryNumber';
export const DIARY_UPDATE_PATH = 'update';
export const OTHERS_PATH = '*';

// variable: 절대 path 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;
export const AUTH_ABSOLUTE_PATH = `${ROOT_PATH}${AUTH_PATH}`;
export const MAIN_ABSOLUTE_PATH = `${ROOT_PATH}${MAIN_PATH}`;
export const MEMORY_TEST_ABSOLUTE_PATH = `${ROOT_PATH}${MEMORY_TEST_PATH}`;
export const MEMORY_TEST_COMPLETE_ABSOLUTE_PATH = `${ROOT_PATH}${MEMORY_TEST_PATH}/${MEMORY_TEST_COMPLETE_PATH}`;
export const CONCENTRATION_TEST_ABSOLUTE_PATH = `${ROOT_PATH}${CONCENTRATION_TEST_PATH}`;
export const CONCENTRATION_TEST_COMPLETE_ABSOLUTE_PATH = `${ROOT_PATH}${CONCENTRATION_TEST_PATH}/${CONCENTRATION_TEST_COMPLETE_PATH}`;
export const DIARY_ABSOLUTE_PATH = `${ROOT_PATH}${DIARY_PATH}`;
export const DIARY_WRITE_ABSOLUTE_PATH = `${ROOT_PATH}${DIARY_PATH}/${DIARY_WRITE_PATH}`;
export const DIARY_VIEW_ABSOLUTE_PATH = (diaryNumber: number | string) => `${ROOT_PATH}${DIARY_PATH}/${diaryNumber}`;
export const DIARY_UPDATE_ABSOLUTE_PATH = (diaryNumber: number | string) => `${ROOT_PATH}${DIARY_PATH}/${diaryNumber}/${DIARY_UPDATE_PATH}`;

// variable: access token 속성명 //
export const ACCESS_TOKEN = 'accessToken';
// variable: join type 속성명 //
export const JOIN_TYPE = 'joinType';
// variable: sns id 속성명 //
export const SNS_ID = 'snsId';
