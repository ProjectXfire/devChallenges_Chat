import { colors } from "@styles/variables/colors";
import { device } from "@styles/variables/screens";
import styled from "styled-components";

export const SChatUserMessages = styled.article`
  display: grid;
  gap: 5px;
  margin-bottom: 30px;
  grid-template-columns: 1fr 4fr;
  @media ${device.mobileL} {
    grid-template-columns: 1fr 6fr;
  }
  @media ${device.tabletS} {
    grid-template-columns: 1fr 8fr;
  }
  @media ${device.tabletM} {
    grid-template-columns: 1fr 10fr;
  }
  @media ${device.laptop} {
    grid-template-columns: 1fr 12fr;
  }
`;

export const SChatUserAvatar = styled.div`
  img {
    border-radius: 5px;
  }
`;

export const SChatUserMessage = styled.div`
  h4 {
    margin: 0;
    margin-bottom: 10px;
    color: ${colors.mediumBlack};
  }
`;
