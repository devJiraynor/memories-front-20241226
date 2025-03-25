// interface: patch user request body DTO //
export default interface PatchUserRequestDto {
  name: string;
  profileImage: string | null;
  address: string;
  detailAddress: string | null;
  gender: string | null;
  age: number | null;
}