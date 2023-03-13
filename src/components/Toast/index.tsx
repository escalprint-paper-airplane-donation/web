import { Container } from "./index.style";
import useToast from "./hooks/useToast";

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
  const { toastRef } = useToast({ isVisible: props.isVisible });

  return (
    <Container className={props.className} ref={toastRef}>
      {props.message}
    </Container>
  );
};

export default Toast;
