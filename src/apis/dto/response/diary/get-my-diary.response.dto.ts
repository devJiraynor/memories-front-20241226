import { ResponseDto } from 'src/apis/dto/response';
import { Diary } from 'src/types/interfaces';

// interface: get my diary response body DTO //
export default interface GetMyDiaryResponseDto extends ResponseDto {
  diaries: Diary[];
}