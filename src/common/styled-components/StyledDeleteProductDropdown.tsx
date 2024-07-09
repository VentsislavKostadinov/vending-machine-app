import styled from "styled-components";

export const StyledDeleteProductDropdown = styled.div`
  margin-top: 4em;

  & h2 {
    color: #ff0000;
  }

  & .form-control {
    width: 60%;
    margin: auto;
  }

  @media only screen and (max-width: 576px) {
    & .form-control {
        width: 100%;
      }
  }
`;
