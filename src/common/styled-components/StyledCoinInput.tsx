import { Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";

export const StyledButton = styled.div`
  text-align: center;
  h2 {
    margin-bottom: 1rem;
  }
  .btn-group {
    flex-direction: column;
    align-items: baseline;
  }
`;

export const flash = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

export const FlashingText = styled.h4`
  animation: ${flash} 1s infinite;
`;

export const StyledCircleButton = styled(({ ...props }) => (
  <Button {...props} />
))`
  width: 50px;
  height: 50px;
  border: 5px solid #ffff33;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  padding: 0;
`;
