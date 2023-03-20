import styled from "styled-components";

import Description from "shared/components/Description/Container";
import Title from "shared/components/Title/Container";

export const Container = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 2rem;
  padding-top: 2.5rem;
`;

export const StyledTitle = styled(Title)`
  margin-bottom: 1.2rem;
  text-align: center;
`;

export const StyledDescription = styled(Description)`
  margin-bottom: 1.4rem;
`;

export const Period = styled.div`
  margin-bottom: 2.6rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.2rem;
  background-color: #f3faf0;
  color: #55ad1e;
  font-size: 1.2rem;
  line-height: 1.33;
`;

export const HoldPaperAirplaneImage = styled.img`
  width: 18rem;
  margin-bottom: 3rem;
`;
