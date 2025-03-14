// interface: sign up request body DTO //
export default interface SignUpRequestDto {
  userId: string;
  userPassword: string;
  name: string;
  address: string;
  detailAddress: string | null;
  joinType: 'NORMAL' | 'KAKAO' | 'NAVER';
}