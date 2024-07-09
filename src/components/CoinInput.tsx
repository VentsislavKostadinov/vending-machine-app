import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { CoinInputProps } from "../model/CoinInput";
import { denominations } from "../utils/denominations";
import { StyledButton, FlashingText, StyledCircleButton } from "../common/styled-components/StyledCoinInput";

export const CoinInput: React.FC<CoinInputProps> = ({ onInsert, coins }) => {
  return (
    <StyledButton>
      <FlashingText>Insert Coins</FlashingText>
      <ButtonGroup>
        {denominations.map((denomination) => (
          <StyledCircleButton
            key={denomination}
            variant="warning"
            onClick={() => onInsert(denomination)}
          >
            {denomination.toFixed(2)}
          </StyledCircleButton>
        ))}
      </ButtonGroup>
    </StyledButton>
  );
};


