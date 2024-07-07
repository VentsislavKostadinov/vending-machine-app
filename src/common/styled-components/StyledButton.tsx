import { Button } from "react-bootstrap";
import styled from "styled-components";

export const StyledButton = styled(({ ...props }) => <Button {...props} />)`
  &.active {
    background-color: #212529;
    border: #212529;
  }
`;
