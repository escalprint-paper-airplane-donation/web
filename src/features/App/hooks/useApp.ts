import { useContext, useEffect } from "react";
import { useAtom } from "jotai";

import nicknameAtom from "shared/atoms/nicknameAtom";
import participatedAtom from "shared/atoms/participatedAtom";
import { ToastContext } from "shared/components/Toast/ToastProvider";
import getParticipation from "shared/apis/getParticipation";
import getAutoLoginAvailable from "../apis/getAutoLoginAvailable";

const useApp = () => {
  const { showToast } = useContext(ToastContext);
  const [, setNickname] = useAtom(nicknameAtom);
  const [, setParticipated] = useAtom(participatedAtom);

  useEffect(() => {
    checkAutoLoginAvailable();
    checkParticipated();
  }, []);

  const checkAutoLoginAvailable = async () => {
    const { result, data } = await getAutoLoginAvailable();

    if (!result || !data) {
      // TODO: accessToken이 없을 경우에는 toast가 나오지 않도록
      showToast(`에러가 발생했어요.
      이 메시지가 반복된다면 1688-4272 고객센터로 연락주세요.`);
      return;
    }

    if (data.isLogin) {
      setNickname(data.nickname || ""); // TODO: 기본값 없애야
      return;
    } else {
      localStorage.removeItem("accessToken");
      return;
    }
  };

  const checkParticipated = async () => {
    const { result, data } = await getParticipation();

    if (result && data) {
      setParticipated(data.isParticipate);
      return;
    }

    showToast(`에러가 발생했어요.
    이 메시지가 반복된다면 1688-4272 고객센터로 연락주세요.`);
  };

  return {};
};

export default useApp;
