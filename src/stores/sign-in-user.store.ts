import { create } from 'zustand';

// interface: 로그인 유저 정보 상태 구조 //
interface SignInUserStore {
  userId: string;
  name: string;
  profileImage: string | null;
  address: string;
  detailAddress: string | null;
  gender: string | null;
  age: number | null;

  setUserId: (userId: string) => void;
  setName: (name: string) => void;
  setProfileImage: (profileImage: string | null) => void;
  setAddress: (address: string) => void;
  setDetailAddress: (detailAdress: string | null) => void;
  setGender: (gender: string | null) => void;
  setAge: (age: number | null) => void;

  resetSignInUser: () => void;
}

// function: 로그인 유저 정보 스토어 생성 함수 //
const useStore = create<SignInUserStore>(set => ({
  userId: '',
  name: '',
  profileImage: null,
  address: '',
  detailAddress: null,
  gender: null,
  age: null,

  setUserId: (userId: string) => set(state => ({ ...state, userId })),
  setName: (name: string) => set(state => ({ ...state, name })),
  setProfileImage: (profileImage: string | null) => set(state => ({ ...state, profileImage })),
  setAddress: (address: string) => set(state => ({ ...state, address })),
  setDetailAddress: (detailAddress: string | null) => set(state => ({ ...state, detailAddress })),
  setGender: (gender: string | null) => set(state => ({ ...state, gender })),
  setAge: (age: number | null) => set(state => ({ ...state, age })),

  resetSignInUser: () => set(state => ({ 
    ...state, 
    userId: '',
    name: '',
    profileImage: null,
    address: '',
    detailAddress: null,
    gender: null,
    age: null,
  }))
}));

export default useStore;