import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

export const StyledListGroup = styled(({ ...props }) => (
    <ListGroup {...props} />
  ))`

  background: #f2f2f2;
    & .list-group-item {
      background: transparent;
      border: none;
    }
  `;
  