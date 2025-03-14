import axios, { AxiosError, AxiosResponse } from 'axios';

import { IdCheckRequestDto, SignUpRequestDto } from './dto/request/auth';
import { ResponseDto } from './dto/response';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const ID_CHECK_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;

// function: response 성공 처리 함수 //
const responseSuccessHandler = (response: AxiosResponse<ResponseDto>) => {
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