import { Form } from "react-bootstrap";
import styled from "styled-components";

export const StyledForm = styled(({ ...props }) => <Form {...props} />)`
max-width: 50%;
margin: auto;

@media only screen and (max-width: 576px) {
  max-width: 100%;
}
`;