import { IdCheckRequestDto } from './dto/request/auth';

import axios from 'axios';

// function: id check API 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
  const responseBody = await axios.post('http://127.0.0.1:4000/api/v1/auth/id-check', requestBody)
    .then(response => {
      // response.data: Response Body
      const { data } = response;
      return data;
    })
    .catch(error => {
      if (!error.response) return null;
      const { data } = error.response;
      return data;
    });
  return responseBody;
};