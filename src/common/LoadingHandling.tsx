import React from "react";
import { Spinner } from "react-bootstrap";
import { CenteredContainer } from "./styled-components/CenteredContainer";

export const LoadingHandling: React.FC = () => {
  return (
    <CenteredContainer>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </CenteredContainer>
  );
};

