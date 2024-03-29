import styled from "styled-components";

import ScrollableContainer from "shared/components/ScrollableContainer/Container";

import colors from "shared/assets/colors";

export const Container = styled(ScrollableContainer)<{
  pageBackgroundImage: string;
}>`
  position: relative;
  padding-top: 2rem;
  background-image: ${({ pageBackgroundImage }) => pageBackgroundImage};
`;

export const ShareButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: ${colors.white};
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ContentContainer = styled.div<{
  pageBackgroundImage: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% + 4rem);
  background-image: ${({ pageBackgroundImage }) => pageBackgroundImage};
`;

export const CertificateArea = styled.div<{
  borderColor: string;
  certificateBackgroundImage: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
  margin-bottom: 13.5rem;
  padding: 3.6rem 3.4rem 1.6rem 3.4rem;
  border: 0.2rem solid ${({ borderColor }) => borderColor};
  border-radius: 2rem;
  background-image: ${({ certificateBackgroundImage }) =>
    certificateBackgroundImage};
`;

export const Title = styled.p`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 2.8rem;
  white-space: pre-line;
`;

export const Description = styled.p`
  margin-bottom: 1.6rem;
  color: ${colors.gray500};
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.5rem;
  white-space: pre-line;
`;

export const AirplaneImage = styled.img`
  width: 16rem;
  margin-bottom: 1.6rem;
`;

export const Phrase = styled.p`
  margin-bottom: 0.8rem;
  color: ${colors.gray500};
  font-size: 1rem;
`;

export const Signature = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 3.4rem;
  margin-bottom: 3rem;

  > span {
    font-size: 1.4rem;
    font-weight: 600;
  }

  > img {
    position: absolute;
    right: -2rem;
    width: 3.4rem;
  }
`;

export const CorporationLogos = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;

  > img {
    width: 5rem;
  }
`;

export const ButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2.4rem 0rem 2rem 0rem;
`;

export const ButtonArea = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1.4rem;

  > button {
    flex-grow: 1;
  }
`;

export const BackToMainButton = styled.button`
  color: ${colors.white};
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
`;
