import React from "react";
import { Form } from "react-bootstrap";
import { DeleteProductDropdownProps } from "../model/DeleteProductDropdown";

export const DeleteProductDropdown: React.FC<DeleteProductDropdownProps> = ({
  products,
  deleteProduct,
}) => {
  return (
    <>
      <h2>Delete Product</h2>
      <Form.Group controlId="formGridDelete">
        <Form.Control
          as="select"
          onChange={(e) => deleteProduct(Number(e.target.value))}
        >
          <option value="">Select a product to delete</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};
