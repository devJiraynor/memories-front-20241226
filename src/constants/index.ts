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

// variable: 기억력 검사 설명 //
export const MEMORY_DESCRIPTION = '16개의 뒤집혀진 카드의 앞면을 기억하여\n동일한 앞면의 카드 두 개를 연속해서 뒤집어\n모두 앞면으로 돌리면 성공입니다.\n검사 시작부터 모두 돌리는데 까지 걸린 시간을 측정합니다.';

// variable: 집중력 검사 설명 //
export const CONCENTRATION_DESCRIPTION = '1분 이내에 ■가 0.5초 간 ★로\n20번 변경됩니다.\n■가 ★로 변경되면 ★를 클릭하세요.\n성공한 클릭의 횟수를 기록합니다.';
