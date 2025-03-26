import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getWayRequest } from "src/apis";
import { GetWayRequestBodyDto } from "src/apis/dto/request/openai";
import { ResponseDto } from "src/apis/dto/response";
import { GetWayResponseDto } from "src/apis/dto/response/openai";
import { ACCESS_TOKEN } from "src/constants";

import Markdown from 'react-markdown';

import './style.css';

// interface: 기억력을 높이는 방법 컴포넌트 속성 //
interface Props {
  type: '기억력' | '집중력';
}

// component: 기억력을 높이는 방법 컴포넌트 //
export default function Way({ type }: Props) {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 결과 상태 //
  const [result, setResult] = useState<string>('');

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: get way response 처리 함수 //
  const getWayResponse = (responseBody: GetWayResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' : 
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' :
      responseBody.code === 'OAE' ? 'AI 작업 중 문제가 발생했습니다.' :
      responseBody.code === 'VF' ? '성별과 나이를 변경해주세요.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { result } = responseBody as GetWayResponseDto;
    setResult(result);
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if (!accessToken) return;
    const requestBody: GetWayRequestBodyDto = { type }
    getWayRequest(requestBody, accessToken).then(getWayResponse);
  }, []);

  // render: 기억력을 높이는 방법 컴포넌트 렌더링 //
  return (
    <div className='way-container'>
      <Markdown>
      {result ? result : '잠시만 기다려주세요...'}
      </Markdown>
    </div>
  )
}