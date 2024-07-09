import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

export const StyledListGroup = styled(({ ...props }) => (
    <ListGroup {...props} />
  ))`


    & .list-group-item {
      background: transparent;
      border: none;
    }
  `;
  