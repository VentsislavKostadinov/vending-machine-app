import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import styled from "styled-components";
import { CoinInputProps } from "../model/CoinInput";
import { denominations } from "../utils/denominations";

export const CoinInput: React.FC<CoinInputProps> = ({ onInsert }) => {
  return (
    <StyledButton>
      <h2>Insert Coins</h2>
      <ButtonGroup>
        {denominations.map((denomination) => (
          <Button key={denomination} onClick={() => onInsert(denomination)}>
            {denomination.toFixed(2)}
          </Button>
        ))}
      </ButtonGroup>
    </StyledButton>
  );
};

const StyledButton = styled.div`
  .btn-primary {
    margin: 0.25rem;
  }
`;
