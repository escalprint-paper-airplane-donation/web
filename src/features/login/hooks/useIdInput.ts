import { ChangeEvent, useState } from "react";

const useIdInput = () => {
  const [id, setId] = useState("");
  const [idWarningMessage, setIdWarningMessage] = useState("");

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);

    const result = checkValidity(e.target.value);

    if (result) {
      setIdWarningMessage("");
    } else {
      setIdWarningMessage("이 아이디가 아닌거 같아요 :(");
    }
  };

  const checkValidity = (value: string) => {
    const pattern = /^[a-zA-Z]{1,20}$/;
    return pattern.test(value);
  };

  return {
    handleIdChange,
    id,
    idWarningMessage,
  };
};

export default useIdInput;
