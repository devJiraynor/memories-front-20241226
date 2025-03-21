import React, { useEffect, useState } from 'react'
import './style.css';
import { MemoryCard } from 'src/types/interfaces';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, MEMORY_DESCRIPTION, MEMORY_TEST_COMPLETE_ABSOLUTE_PATH } from 'src/constants';
import { PostMemoryRequestDto } from 'src/apis/dto/request/test';
import { postMemoryRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { useNavigate } from 'react-router';
import { useMemoryTestStore } from 'src/stores';

// interface: 메모리 검사 카드 컴포넌트 속성 //
interface CardProps {
  memoryCard: MemoryCard;
  onClick: (id: number) => void;
}

// component: 메모리 검사 카드 컴포넌트 //
function Card({ memoryCard, onClick }: CardProps) {

  const { id, color, isReverse } = memoryCard;

  if (isReverse) 
  return (
    <div className='reversed-card' onClick={() => onClick(id)}></div>
  )

  // render: 메모리 검사 카드 컴포넌트 렌더링 //
  return (
    <div style={{ backgroundColor: color }}></div>
  )
}

// variable: 색상 리스트 //
const COLORS = ['#CF3832', '#A6AAA4', '#B40089', '#57A365', '#334194', '#F8F253', '#DD883D', '#00AFFF'];
// variable: 무작위 색상 리스트 //
const MIX_COLORS = [...COLORS, ...COLORS].sort(() => Math.random() - 0.5);

// component: 기억력 검사 화면 컴포넌트 //
export default function MemoryTest() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 검사 시작 여부 상태 //
  const [isStarted, setStarted] = useState<boolean>(false);
  // state: 검사 시작 시간 상태 //
  const [startTime, setStartTime] = useState<number>(0);
  // state: 카드 리스트 상태 //
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  // state: 선택된 카드 리스트 상태 //
  const [selectedCards, setSelectedCards] = useState<MemoryCard[]>([]);
  // state: 완료 상태 //
  const [isFinish, setFinish] = useState<boolean>(false);
  // state: 측정된 시간 상태 //
  const {measurementTime, setMeasurementTime} = useMemoryTestStore();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: post memory response 처리 함수 //
  const postMemoryResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    navigator(MEMORY_TEST_COMPLETE_ABSOLUTE_PATH);
  };

  // event handler: 검사 시작 버튼 클릭 이벤트 처리 //
  const onStartClickHandler = () => {
    setStarted(true);
  };

  // event handler: 카드 클릭 이벤트 처리 //
  const onCardClickHandler = (id: number) => {
    const selectedCard = memoryCards.find(card => card.id === id);
    if (selectedCards.length === 2 || !selectedCard) return;

    const newSelectedCards = [...selectedCards, selectedCard];
    setSelectedCards(newSelectedCards);

    const newMemoryCards: MemoryCard[] = memoryCards.map(
      card => card.id === id ? { ...card, isReverse: false } : card
    );
    setMemoryCards(newMemoryCards);

    if (newSelectedCards.length === 2) {
      const [first, second] = newSelectedCards;
      
      setTimeout(() => {
        if (first.color !== second.color) {
          const newMemoryCards = memoryCards.map(
            card => card.id === first.id || card.id === second.id ? { ...card, isReverse: true } : card
          );
          setMemoryCards(newMemoryCards);
        }
        setSelectedCards([]);
      }, 500);
      
    }
  };

  // effect: 게임 상태가 변경될시 실행할 함수 //
  useEffect(() => {
    if (!isStarted) return;

    const initMemoryCards: MemoryCard[] = 
      MIX_COLORS.map((color, id) => ({
        id, color, isReverse: false
      }));
    setMemoryCards(initMemoryCards);

    setTimeout(() => {
      const memoryCards = 
        initMemoryCards.map(card => ({ ...card, isReverse: true }));
      setMemoryCards(memoryCards);
      setStartTime(Date.now());
    }, 3000);
  }, [isStarted]);

  // effect: 검사 카드 리스트가 변경될시 실행할 함수 //
  useEffect(() => {
    if (startTime && memoryCards.length && memoryCards.every(card => !card.isReverse)) {
      setFinish(true);
      const measurementTime = Math.floor((Date.now() - startTime) / 1000);
      setMeasurementTime(measurementTime);
    }
  }, [memoryCards]);

  // effect: 종료 상태가 변경될시 실행할 함수 //
  useEffect(() => {
    if (!isFinish || !accessToken) return;
    const requestBody: PostMemoryRequestDto = {
      measurementTime
    };
    postMemoryRequest(requestBody, accessToken).then(postMemoryResponse);
  }, [isFinish]);

  // render: 기억력 검사 화면 컴포넌트 렌더링 //
  return (
    <div id='memory-test-wrapper'>
      <div className='container'>
        <div className='description-box'>
          <div className='title'>기억력 검사</div>
          <div className='description'>{MEMORY_DESCRIPTION}</div>
        </div>
        <div className='test-box'>
          {isStarted ? 
          <div className='card-container'>
            {memoryCards.map((memoryCard, index) => 
            <Card key={index} memoryCard={memoryCard} onClick={onCardClickHandler} />
            )}
          </div> :
          <div className='button middle primary' onClick={onStartClickHandler}>검사 시작</div>
          }
        </div>
      </div>
    </div>
  )
}
