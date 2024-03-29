import styled from "styled-components";
import colors from "shared/assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const Title = styled.span<{ isFocused: boolean; wrongInput: boolean }>`
  color: ${({ isFocused, wrongInput }) =>
    wrongInput ? colors.red : isFocused ? colors.green500 : colors.gray500};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.6rem;
`;

export const InputField = styled.input<{ wrongInput: boolean }>`
  padding: 1rem;
  border: 1px solid
    ${({ wrongInput }) => (wrongInput ? colors.red : colors.gray300)};
  border-radius: 0.5rem;
  color: ${colors.gray900};
  font-size: 1.4rem;
  caret-color: #17cc10;

  ::placeholder {
    color: ${colors.gray400};
  }

  :focus {
    border: 1px solid
      ${({ wrongInput }) => (wrongInput ? colors.red : colors.green500)};
  }
`;

export const WarningMessage = styled.p`
  color: ${colors.red};
  font-size: 1rem;
`;
