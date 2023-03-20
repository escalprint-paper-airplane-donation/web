import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

import { ToastTheme } from "shared/components/Toast/Container";
import { ToastContext } from "shared/components/Toast/ToastProvider";
import copyImageByClipboardApi from "shared/utils/copyImageByClipboardApi";
import copyImageByExecCommand from "shared/utils/copyImageByExecCommand";
import shareUrlByWebShareApi from "shared/utils/shareUrlByWebShareApi";

const useDonationCertificate = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const certificateAreaRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState("");

  const handleBackToMainClick = () => {};

  const handleHistoryClick = () => {
    navigate("/history");
  };

  const handleSaveImageClick = async () => {
    if (!certificateAreaRef.current) return;

    const images = certificateAreaRef.current.querySelectorAll("img");
    const imagesLoadedPromise = Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(null);
            } else {
              img.addEventListener("load", () => resolve(null));
              img.addEventListener("error", () => resolve(null));
            }
          })
      )
    );

    await imagesLoadedPromise;

    const imageElement = await html2canvas(certificateAreaRef.current);
    const link = document.createElement("a");
    link.href = imageElement.toDataURL();
    link.download = "donation-certificate.png";
    link.click();
  };

  const handleShareClick = async () => {
    const imageUrl = await convertHtmlToImage();
    if (!imageUrl) {
      return;
    }

    const firstTrial = shareUrlByWebShareApi({
      title: "에스칼프린트x초록우산 종이비행기 기부인증서",
      url: imageUrl,
    });

    if (!firstTrial) {
      const secondTrial = await copyImageByClipboardApi(imageUrl);
      if (secondTrial) {
        showToast("인증서가 클립보드에 저장되었어요!", ToastTheme.GREEN);
      } else {
        const lastTrial = await copyImageByExecCommand(imageUrl);
        if (lastTrial) {
          showToast("인증서가 클립보드에 저장되었어요!", ToastTheme.GREEN);
        } else {
          showToast("공유하기가 지원되지 않는 환경입니다.");
        }
      }
    }
  };

  const convertHtmlToImage = async () => {
    const certificateArea = certificateAreaRef.current;

    if (certificateArea) {
      try {
        const imageElement = await html2canvas(certificateAreaRef.current);
        return imageElement.toDataURL();
      } catch (e) {
        console.error(e);
        return undefined;
      }
    }
  };

  return {
    certificateAreaRef,
    handleBackToMainClick,
    handleSaveImageClick,
    handleHistoryClick,
    handleShareClick,
    nickname,
  };
};

export default useDonationCertificate;