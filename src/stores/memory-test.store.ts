import { create } from "zustand";

// interface: 기억력 검사 결과 상태 구조 //
interface MemoryTestStore {
  measurementTime: number;
  setMeasurementTime: (measurementTime: number) => void;
}

// function: 기억력 검사 스토어 생성 함수 //
const useStore = create<MemoryTestStore>(set => ({
  measurementTime: 0,
  setMeasurementTime: (measurementTime: number) => set(state => ({ ...state, measurementTime })),
}));

export default useStore;