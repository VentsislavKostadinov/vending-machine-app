import React, { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import styled, { keyframes, css } from "styled-components";
import { CoinInputProps } from "../model/CoinInput";
import { denominations } from "../utils/denominations";
import {
  StyledButton,
  FlashingText,
  StyledCircleButton,
} from "../common/styled-components/StyledCoinInput";

const Slot = styled.div`
  margin: auto;
  width: 70px;
  height: 10px;
  background-color: black;
`;

const moveAndRotateCoin = keyframes`
  to {
    transform: translate(0, -480px) rotate(90deg);
  }
`;

const AnimatedCircleButton = styled(StyledCircleButton)<{ animate: boolean }>`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${moveAndRotateCoin} 0.5s ease forwards;
    `}
`;

export const CoinInput: React.FC<CoinInputProps> = ({ onInsert, coins }) => {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);

  const handleInsert = (denomination: number, index: number) => {
    setAnimateIndex(index);
    setTimeout(() => {
      setAnimateIndex(null);
      onInsert(denomination);
    }, 500);
  };

  return (
    <>
      <Slot id="slot" />
      <StyledButton>
        <FlashingText>Insert Coins</FlashingText>
        <ButtonGroup>
          {denominations.map((denomination, index) => (
            <AnimatedCircleButton
              key={denomination}
              variant="warning"
              onClick={() => handleInsert(denomination, index)}
              animate={animateIndex === index}
            >
              {denomination.toFixed(2)}
            </AnimatedCircleButton>
          ))}
        </ButtonGroup>
      </StyledButton>
      <div>
        <br />
        <br />
        <h6>Inserted coins</h6>
        <p>${coins.toFixed(2)}</p>
      </div>
    </>
  );
};
