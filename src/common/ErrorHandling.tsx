import React from "react";
import { Button } from "react-bootstrap";
import { StyledErrorHandling } from "./styled-components/StyledErrorHandling";

const handleRefreshPage = () => {
  window.location.reload();
};

export const ErrorHandling = () => {
  return (
    <StyledErrorHandling>
      <div>
        <h2>Something went wrong!</h2>
        <p>Please try to refresh the page</p>
        <Button variant="primary" onClick={handleRefreshPage}>
          Refresh
        </Button>
      </div>
    </StyledErrorHandling>
  );
};
