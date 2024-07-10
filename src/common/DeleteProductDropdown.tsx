import React from "react";
import { Form } from "react-bootstrap";
import { DeleteProductDropdownProps } from "../model/DeleteProductDropdown";
import { StyledDeleteProductDropdown } from "./styled-components/StyledDeleteProductDropdown";

export const DeleteProductDropdown: React.FC<DeleteProductDropdownProps> = ({
  products,
  deleteProduct,
}) => {
  return (
    <StyledDeleteProductDropdown>
      <h2>Delete Product</h2>
      <Form.Group controlId="formGridDelete">
        <Form.Control
          data-testid="delete-product-dropdown"
          as="select"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value) deleteProduct(value);
          }}
        >
          <option value="delete-product-dropdown">
            Select a product to delete
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </StyledDeleteProductDropdown>
  );
};
