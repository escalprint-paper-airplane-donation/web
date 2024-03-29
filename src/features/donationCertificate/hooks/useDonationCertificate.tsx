import { useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useAtom } from "jotai";

import { ToastTheme } from "shared/components/Toast/Container";
import { ToastContext } from "shared/components/Toast/ToastProvider";
import copyImageByClipboardApi from "shared/utils/copyImageByClipboardApi";
import copyImageByExecCommand from "shared/utils/copyImageByExecCommand";
import shareByWebShareApi from "shared/utils/shareByWebShareApi";
import nicknameAtom from "shared/atoms/nicknameAtom";

import AirplaneColor from "features/selectAirplane/constants/airplaneColor";
import airplaneList from "features/selectAirplane/constants/airplaneList";
import certificateColorList from "../constants/certificateColorList";

const useDonationCertificate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | { airplaneColor: AirplaneColor; airplaneImage: string }
    | undefined;
  const { showToast } = useContext(ToastContext);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [nickname] = useAtom(nicknameAtom);

  const handleBackToMainClick = () => {
    navigate("/");
  };

  const handleHistoryClick = () => {
    navigate("/history");
  };

  const handleSaveImageClick = async () => {
    if (!contentContainerRef.current) return;

    const imageElement = await html2canvas(contentContainerRef.current, {
      scale: 2,
    });
    const link = document.createElement("a");
    link.href = imageElement.toDataURL();
    link.download = `${nickname}님의 종이비행기 후원인증서.png`;
    link.click();
  };

  const handleShareClick = async () => {
    const imageUrl = await convertHtmlToImage();

    if (!imageUrl) {
      return;
    }

    const firstTrial = await shareByWebShareApi({
      image: imageUrl,
      imageTitle: `${nickname}님의 종이비행기 후원인증서.png`,
    });

    if (firstTrial) {
      return;
    }

    const secondTrial = await copyImageByClipboardApi(imageUrl, 3);
    if (secondTrial) {
      showToast("인증서가 클립보드에 저장되었어요!", ToastTheme.GREEN);
      return;
    }

    const lastTrial = await copyImageByExecCommand(imageUrl);
    if (lastTrial) {
      showToast("인증서가 클립보드에 저장되었어요!", ToastTheme.GREEN);
    } else {
      showToast("공유하기가 지원되지 않는 환경입니다.");
    }
  };

  const convertHtmlToImage = async () => {
    const certificateArea = contentContainerRef.current;

    if (certificateArea) {
      try {
        const imageElement = await html2canvas(contentContainerRef.current);
        const dataURL = imageElement.toDataURL();

        return dataURL;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    }
  };

  const airplaneColor = state?.airplaneColor || airplaneList[0].key;
  const certificateColor =
    certificateColorList.find((item) => item.key === airplaneColor) ||
    certificateColorList[0];

  const airplaneImage =
    airplaneList.find((airplane) => airplane.key === airplaneColor)
      ?.certificate || airplaneList[0].certificate;
  // const airplaneImage = state?.airplaneImage || airplaneList[0].certificate;

  return {
    airplaneImage,
    contentContainerRef,
    certificateColor,
    handleBackToMainClick,
    handleSaveImageClick,
    handleHistoryClick,
    handleShareClick,
  };
};

export default useDonationCertificate;
