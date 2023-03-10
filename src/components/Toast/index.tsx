import { useEffect, useRef } from "react";
import styled from "styled-components";

export enum ToastTheme {
  GRAY = "gray",
  GREEN = "green",
}

interface ToastProps {
  className?: string;
  isVisible: boolean;
  message: string;
  theme: ToastTheme;
}

const Toast = (props: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const toastElement = toastRef.current;
  const fadeOutTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (props.isVisible) {
      slideUp();
    } else {
      fadeOut();
    }
  }, [props.isVisible]);

  const slideUp = () => {
    if (toastElement) {
      toastElement.style.opacity = "1";
      toastElement.style.bottom = "2rem";
    }
  };

  const fadeOut = () => {
    if (toastElement) {
      toastElement.style.opacity = "0";
    }

    resetLocation();
  };

  const resetLocation = () => {
    if (fadeOutTimer.current) {
      clearTimeout(fadeOutTimer.current);
    }

    fadeOutTimer.current = setTimeout(() => {
      if (toastElement) {
        toastElement.style.bottom = "-100%";
      }

      fadeOutTimer.current = null;
    }, 2000);
  };

  return (
    <Container className={props.className} ref={toastRef}>
      {props.message}
    </Container>
  );
};

export const Container = styled.div`
  position: absolute;
  bottom: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  width: 90%;
  padding: 1.6rem;
  border-radius: 1rem;
  background-color: rgb(69 69 69);
  opacity: 1;
  color: rgb(255 255 255);
  font-size: 1.4rem;
  line-height: 1.8rem;
  text-align: center;
  white-space: pre-line;
  transition: bottom 1.5s ease-in-out, opacity 0.8s ease-in-out;
`;

export default Toast;
