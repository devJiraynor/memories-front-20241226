import ResponseDto from "../response.dto";

// interface: get empathy response body DTO //
export default interface GetEmpathyResponseDto extends ResponseDto {
  empathies: string[];
}