import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { getRecentlyConcentrationRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { GetRecentlyConcentrationResponseDto } from 'src/apis/dto/response/test';
import { ACCESS_TOKEN, CONCENTRATION_TEST_ABSOLUTE_PATH } from 'src/constants';
import { ConcentrationTest } from 'src/types/interfaces';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

import { Line } from 'react-chartjs-2';

// description: ChartJS에서 사용할 요소 등록 //
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// component: 최근 집중력 검사 컴포넌트 //
export default function RecentlyConcentration() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 집중력 검사 기록 리스트 상태 //
  const [concentrationTests, setConcentrationTest] = useState<ConcentrationTest[]>([]);

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 차트 데이터 //
  const chartData: ChartData<'line'> = {
    labels: concentrationTests.map(test => test.testDate),
    datasets: [
      {
        label: '성공 점수',
        data: concentrationTests.map(test => test.measurementScore),
        borderColor: 'rgba(0, 132, 255, 1)',
        backgroundColor: 'rgba(0, 132, 255, 0.5)'
      },
      {
        label: '오류 점수',
        data: concentrationTests.map(test => test.errorCount),
        borderColor: 'rgba(255, 84, 64, 1)',
        backgroundColor: 'rgba(255, 84, 64, 0.5)'
      },
    ]
  };

  // variable: 차트 옵션 //
  const chartOption: ChartOptions<'line'> = {
    responsive: false
  };
  
  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get recently concentration response 처리 함수 //
  const getRecentlyConcentrationResponse = (responseBody: GetRecentlyConcentrationResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
    
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { concentrationTests } = responseBody as GetRecentlyConcentrationResponseDto;
    setConcentrationTest(concentrationTests.reverse());
  };

  // event handler: 검사 버튼 클릭 이벤트 처리 //
  const onTestClickHandler = () => {
    navigator(CONCENTRATION_TEST_ABSOLUTE_PATH);
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if (!accessToken) return;
    getRecentlyConcentrationRequest(accessToken).then(getRecentlyConcentrationResponse);
  }, []);

  // render: 최근 집중력 검사 컴포넌트 렌더링 //
  return (
    <div className='recently-container'>
      <div className='recently-top'>
        <div className='recently-title-box'>
          <div className='title'>집중력 검사 기록</div>
          <div className='info-button'>
            집중력을 높이는 방법<div className='icon' />
          </div>
        </div>
        <div className='button primary middle' onClick={onTestClickHandler}>검사하러가기</div>
      </div>
      <div className='recently-chart-box'>
        <Line width={1132} height={300} data={chartData} options={chartOption} />
      </div>
    </div>
  )
}
