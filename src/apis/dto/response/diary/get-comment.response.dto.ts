import { Comment } from "src/types/interfaces";
import ResponseDto from "../response.dto";

// interface: get comment response body DTO //
export default interface GetCommentResponseDto extends ResponseDto {
  comments: Comment[];
}