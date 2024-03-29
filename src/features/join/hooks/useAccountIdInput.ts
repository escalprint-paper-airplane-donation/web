import { ChangeEvent, useContext, useState } from "react";

import useDebouncedCallback from "shared/utils/useDebouncedCallback";
import getIsAccountIdDuplicate from "../../../shared/apis/getIsAccountIdDuplicate";
import { ToastContext } from "shared/components/Toast/ToastProvider";

const useAccountIdInput = () => {
  const { showToast } = useContext(ToastContext);
  const [accountId, setAccountId] = useState("");
  const [accountIdWarningMessage, setAccountIdWarningMessage] = useState("");

  const handleAccountIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setAccountId(inputValue);
    debouncedCheckValidityAndDuplication(inputValue);
  };

  const checkValidityAndDuplication = async (inputValue: string) => {
    const isValidateInput = checkValidity(inputValue);

    if (!isValidateInput) {
      setAccountIdWarningMessage(
        "띄어쓰기 없이, 20자 이하 영문과 숫자를 조합해주세요."
      );
      return;
    }

    const { result, data } = await getIsAccountIdDuplicate({
      accountId: inputValue,
    });

    if (result && data?.isDuplicate) {
      setAccountIdWarningMessage("이미 사용 중인 아이디에요 :(");
      return;
    }

    if (!result) {
      showToast(`이용량 급증으로 인해 닉네임 확인이 지연되고 있어요.
      이 메시지가 반복된다면 1688-4272 고객센터로 연락주세요.`);
      return;
    }

    setAccountIdWarningMessage("");
  };

  const checkValidity = (value: string) => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{1,20}$/;
    return pattern.test(value);
  };

  const debouncedCheckValidityAndDuplication = useDebouncedCallback(
    checkValidityAndDuplication,
    225
  );

  return {
    handleAccountIdChange,
    accountId,
    accountIdWarningMessage,
  };
};

export default useAccountIdInput;
