import { ConcentrationTest } from 'src/types/interfaces';
import ResponseDto from '../response.dto';

// interface: get concentration response body DTO //
export default interface GetConcentrationResponseDto extends ResponseDto {
  concentrationTests: ConcentrationTest[];
}