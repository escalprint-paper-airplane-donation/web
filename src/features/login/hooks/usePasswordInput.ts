import { ChangeEvent, useContext, useState } from "react";

import useDebouncedCallback from "shared/utils/useDebouncedCallback";
import { ToastContext } from "shared/components/Toast/ToastProvider";

import getPasswordExist from "../apis/getPasswordExist";

const usePasswordInput = () => {
  const { showToast } = useContext(ToastContext);
  const [password, setPassword] = useState("");
  const [passwordWarningMessage, setPasswordWarningMessage] = useState("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.length > 0) {
      debouncedCheckPasswordExist(inputValue);
    }
  };

  const checkPasswordExist = async (inputValue: string) => {
    const { result, data } = await getPasswordExist({
      password: inputValue,
    });

    if (!result || !data) {
      showToast(`이용량 급증으로 인해 로그인정보 확인이 지연되고 있어요.
      이 메시지가 반복된다면 1688-4272 고객센터로 연락주세요.`);
      return;
    }

    if (data.isExist) {
      setPasswordWarningMessage("");
      return;
    } else {
      setPasswordWarningMessage("이 비밀번호가 아닌거 같아요 :(");
    }
  };

  const debouncedCheckPasswordExist = useDebouncedCallback(
    checkPasswordExist,
    225
  );

  return {
    handlePasswordChange,
    password,
    passwordWarningMessage,
  };
};

export default usePasswordInput;
