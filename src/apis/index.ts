import axios, { AxiosError, AxiosResponse } from 'axios';

import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from './dto/request/auth';
import { ResponseDto } from './dto/response';
import { SignInResponseDto } from './dto/response/auth';
import { PatchDiaryRequestDto, PostDiaryRequestDto } from './dto/request/diary';
import { GetDiaryResponseDto, GetMyDiaryResponseDto } from './dto/response/diary';
import { GetSignInUserResponseDto } from './dto/response/user';
import { PostConcentrationRequestDto, PostMemoryRequestDto } from './dto/request/test';
import { GetConcentrationResponseDto, GetMemoryResponseDto, GetRecentlyConcentrationResponseDto, GetRecentlyMemoryResponseDto } from './dto/response/test';
import { PatchUserRequestDto } from './dto/request/user';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const ID_CHECK_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;
export const SNS_SIGN_IN_URL = (sns: 'kakao' | 'naver') => `${AUTH_MODULE_URL}/sns/${sns}`;

const DIARY_MODULE_URL = `${API_DOMAIN}/api/v1/diary`;

const POST_DIARY_URL = `${DIARY_MODULE_URL}`;
const GET_MY_DIARY_URL = `${DIARY_MODULE_URL}/my`;
const GET_DIARY_URL = (diaryNumber: number | string) => `${DIARY_MODULE_URL}/${diaryNumber}`;
const PATCH_DIARY_URL = (diaryNumber: number | string) => `${DIARY_MODULE_URL}/${diaryNumber}`;
const DELETE_DIARY_URL = (diaryNumber: number | string) => `${DIARY_MODULE_URL}/${diaryNumber}`;

const USER_MODULE_URL = `${API_DOMAIN}/api/v1/user`;

const GET_SIGN_IN_USER_URL = `${USER_MODULE_URL}/sign-in`;
const PATCH_USER_URL = `${USER_MODULE_URL}`;

const TEST_MODULE_URL = `${API_DOMAIN}/api/v1/test`;

const POST_MEMORY_URL = `${TEST_MODULE_URL}/memory`;
const POST_CONCENTRATION_URL = `${TEST_MODULE_URL}/concentration`;
const GET_MEMORY_URL = `${TEST_MODULE_URL}/memory`;
const GET_CONCENTRATION_URL = `${TEST_MODULE_URL}/concentration`;
const GET_RECENTLY_MEMORY_URL = `${TEST_MODULE_URL}/memory/recently`;
const GET_RECENTLY_CONCENTRATION_URL = `${TEST_MODULE_URL}/concentration/recently`;

const FILE_UPLOAD_URL = `${API_DOMAIN}/file/upload`;

const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } })

// function: response 성공 처리 함수 //
const responseSuccessHandler = <T = ResponseDto>(response: AxiosResponse<T>) => {
  // response.data: Response Body
  const { data } = response;
  return data;
};

// function: response 실패 처리 함수 //
const responseErrorHandler = (error: AxiosError<ResponseDto>) => {
  if (!error.response) return null;
  const { data } = error.response;
  return data;
};

// function: id check API 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
  const responseBody = await axios.post(ID_CHECK_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: sign up API 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const responseBody = await axios.post(SIGN_UP_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: sign in API 요청 함수 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
  const responseBody = await axios.post(SIGN_IN_URL, requestBody)
    .then(responseSuccessHandler<SignInResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post diary API 요청 함수 //
export const postDiaryRequest = async (requestBody: PostDiaryRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_DIARY_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my diary API 요청 함수 //
export const getMyDiaryRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_MY_DIARY_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetMyDiaryResponseDto>)
    .catch(responseErrorHandler)
  return responseBody;
};

// function: get diary API 요청 함수 //
export const getDiaryRequest = async (diaryNumber: number | string, accessToken: string) => {
  const responseBody = await axios.get(GET_DIARY_URL(diaryNumber), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetDiaryResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch diary API 요청 함수 //
export const patchDiaryRequest = async (diaryNumber: number | string, requestBody: PatchDiaryRequestDto, accessToken: string) => {
  const responseBody = await axios.patch(PATCH_DIARY_URL(diaryNumber), requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete diary API 요청 함수 //
export const deleteDiaryRequest = async (diaryNumber: number | string, accessToken: string) => {
  const responseBody = await axios.delete(DELETE_DIARY_URL(diaryNumber), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
};

// function: get sign in user API 요청 함수 //
export const getSignInUserRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_SIGN_IN_USER_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetSignInUserResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch user API 요청 함수 //
export const patchUserRequest = async (requestBody: PatchUserRequestDto, accessToken: string) => {
  const responseBody = await axios.patch(PATCH_USER_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post memory API 요청 함수 //
export const postMemoryRequest = async (requestBody: PostMemoryRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_MEMORY_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post concentration API 요청 함수 //
export const postConcentrationRequest = async (requestBody: PostConcentrationRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_CONCENTRATION_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
};

// function: get memory API 요청 함수 //
export const getMemoryRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_MEMORY_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetMemoryResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get concentration API 요청 함수 //
export const getConcentrationRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_CONCENTRATION_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetConcentrationResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get recently memory API 요청 함수 //
export const getRecentlyMemoryRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_RECENTLY_MEMORY_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetRecentlyMemoryResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get recently concentration API 요청 함수 //
export const getRecentlyConcentration = async (accessToken: string) => {
  const responseBody = await axios.get(GET_RECENTLY_CONCENTRATION_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetRecentlyConcentrationResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: file upload 요청 함수 //
export const fileUploadRequest = async (requestBody: FormData) => {
  const responseBody = await axios.post(FILE_UPLOAD_URL, requestBody, multipartFormData)
    .then(responseSuccessHandler<string>)
    .catch(error => null);
  return responseBody;
};