import axios, { AxiosError, AxiosResponse } from 'axios';

import { IdCheckRequestDto, SignUpRequestDto } from './dto/request/auth';
import { ResponseDto } from './dto/response';

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
  const responseBody = await axios.post('http://127.0.0.1:4000/api/v1/auth/id-check', requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: sign up API 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const responseBody = await axios.post('http://127.0.0.1:4000/api/v1/auth/sign-up', requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};