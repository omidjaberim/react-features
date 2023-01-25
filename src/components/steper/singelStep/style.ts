import styled from "styled-components";

export const StyledSingleStep = styled.div`
  font-size: 16px;
  font-weight: 700;
  width: 200px;
  .shap {
    width: 10px;
    height: 42px;
    position: absolute;
    z-index: 9;

    @media screen and (min-width: 1280px) and (max-width: 1536px) {
      width: 18px;
    }
  }
  .shap-1 {
    top: -16px;
    left: -2px;
    transform: rotate(35deg);
  }
  .shap-2 {
    bottom: -16px;
    left: -2px;
    transform: rotate(-35deg);
  }
  /* .shap-3 {
    right: -32px;
    top: -19px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(30deg);
  }
  .shap-4 {
    right: -30px;
    top: 3px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(65deg);
  } */
`;
