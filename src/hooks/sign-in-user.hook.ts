import { useCookies } from "react-cookie";
import { getSignInUserRequest } from "src/apis";
import { ResponseDto } from "src/apis/dto/response";
import { GetSignInUserResponseDto } from "src/apis/dto/response/user";
import { ACCESS_TOKEN, ROOT_PATH } from "src/constants";
import { useSignInUserStore } from "src/stores";

const useSignInUser = () => {

  // state: cookie 상태 //
  const [cookies, _, removeCookie] = useCookies();
  
  // state: 로그인 유저 정보 상태 //
  const { setUserId, setName, setProfileImage, setAddress, setDetailAddress, setGender, setAge, resetSignInUser } = useSignInUserStore();

  // function: get sign in user response 처리 함수 //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      removeCookie(ACCESS_TOKEN, { path: ROOT_PATH });
      resetSignInUser();
      return;
    }

    const { userId, name, profileImage, address, detailAddress, gender, age } = responseBody as GetSignInUserResponseDto;
    setUserId(userId);
    setName(name);
    setProfileImage(profileImage);
    setAddress(address);
    setDetailAddress(detailAddress);
    setGender(gender);
    setAge(age);
  };

  // function: 로그인 사용자 정보 불러오기 //
  const getSignInUser = () => {
    getSignInUserRequest(cookies[ACCESS_TOKEN]).then(getSignInUserResponse);
  };

  return getSignInUser;

};

export default useSignInUser;