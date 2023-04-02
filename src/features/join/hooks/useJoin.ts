import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "shared/components/Toast/ToastProvider";
import postSignUp from "../fetchers/postSignUp";
import postSignIn from "features/login/fetchers/postSignIn";

import useIdInput from "./useIdInput";
import useNicknameInput from "./useNicknameInput";
import usePasswordInput from "./usePasswordInput";
import useRetypedPasswordInput from "./useRetypedPasswordInput";

const useJoin = () => {
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const {
    handleNicknameChange,
    nickname,
    nicknameWrongInput,
    nicknameWarningMessage,
  } = useNicknameInput();
  const { handleIdChange, id, idWarningMessage, idWrongInput } = useIdInput();
  const {
    handlePasswordChange,
    password,
    passwordWarningMessage,
    passwordWrongInput,
  } = usePasswordInput();
  const {
    handleRetypedPasswordChange,
    retypedPassword,
    retypePasswordWarningMessage,
    retypedPasswordWrongInput,
  } = useRetypedPasswordInput(password);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmitClick = async () => {
    const { result, statusCode } = await postSignUp({
      nickname,
      accountId: id,
      password,
    });

    if (result) {
      handleLogin();

      return;
    }

    if (statusCode === 400) {
      showToast("모든 영역이 잘 입력되었는지 확인해주세요.");
      return;
    }

    showToast(
      "회원가입이 지연되고 있습니다. 이 메시지가 반복될 경우 고객센터로 연락해주세요."
    );
  };

  const handleLogin = async () => {
    const { result, data } = await postSignIn({
      accountId: id,
      password,
    });

    if (result && data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("nickname", data.nickname); // TODO: 글로벌로만 가지고 있기
      navigate("/selectairplane");
      return;
    }

    showToast(
      "로그인이 지연되고 있습니다. 이 메시지가 반복될 경우 고객센터로 연락해주세요."
    );
  };

  const allInputValidated = [
    nicknameWrongInput,
    idWrongInput,
    passwordWrongInput,
    retypedPasswordWrongInput,
  ].every((value) => value !== true);

  const allInputHaveValue = [nickname, id, password, retypedPassword].every(
    (value) => value !== ""
  );

  const canSubmit = allInputValidated && allInputHaveValue;

  return {
    canSubmit,
    handleLoginClick,
    handleSubmitClick,
    handleNicknameChange,
    nickname,
    nicknameWrongInput,
    nicknameWarningMessage,
    handleIdChange,
    id,
    idWarningMessage,
    idWrongInput,
    handlePasswordChange,
    password,
    passwordWarningMessage,
    passwordWrongInput,
    handleRetypedPasswordChange,
    retypedPassword,
    retypePasswordWarningMessage,
    retypedPasswordWrongInput,
  };
};

export default useJoin;
