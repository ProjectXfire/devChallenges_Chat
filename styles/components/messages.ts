import { colors } from "@styles/variables/colors";
import { device } from "@styles/variables/screens";
import styled from "styled-components";

export const SChatUserMessages = styled.article`
  display: grid;
  gap: 5px;
  margin-bottom: 20px;
  grid-template-columns: 1fr 5fr;
  @media ${device.mobileL} {
    grid-template-columns: 1fr 8fr;
  }
  @media ${device.tabletS} {
    grid-template-columns: 1fr 10fr;
  }
  @media ${device.tabletM} {
    grid-template-columns: 1fr 12fr;
  }
  @media ${device.tabletL} {
    grid-template-columns: 1fr 10fr;
  }
  @media ${device.laptop} {
    grid-template-columns: 1fr 16fr;
  }
`;

export const SChatUserAvatar = styled.div`
  img {
    border-radius: 50%;
  }
`;

export const SChatUserMessage = styled.div`
  background-color: ${colors.darkBlack};
  border: 2px solid ${colors.lightWhite};
  border-radius: 10px;
  padding: 10px;
  h4 {
    margin: 0;
    margin-bottom: 5px;
    color: ${colors.mediumBlack};
  }
  p {
    font-size: 0.9rem;
  }
  video {
    height: 25px;
    min-width: 220px;
  }
`;
