import { ResponseDto } from 'src/apis/dto/response';

// interface: sign in response body DTO //
export default interface SignInResponseDto extends ResponseDto {
  accessToken: string;
  expiration: number;
}