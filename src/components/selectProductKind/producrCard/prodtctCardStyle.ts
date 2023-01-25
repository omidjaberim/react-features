import { SIM_KIND } from "constants/enum/product.enum";
import styled from "styled-components";

interface StyledCardProps {
  type: SIM_KIND;
}

export const StyledCard = styled.div<StyledCardProps>`
  background: ${(p) =>
    p.type === SIM_KIND.DATA
      ? "radial-gradient(50% 50% at 50% 50%, rgba(49, 79, 109, 0.84) 0%, #758CA4 100%)"
      : p.type === SIM_KIND.PERMANENT
      ? "radial-gradient(50% 50% at 50% 50%, rgba(9, 51, 64, 0.84) 0%, #093340 100%)"
      : p.type === SIM_KIND.PREPAID
      ? "radial-gradient(50% 50% at 50% 50%, rgba(36, 101, 181, 0.84) 0%, #09356A 100%)"
      : "white"};
  max-width: 390px;
  height: 205px;
  /* border-radius: 15px; */
`;
