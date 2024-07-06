import React from "react";
import { Button } from "react-bootstrap";
import { AddProductButtonProps } from "../model/AddProductButton";


export const AddProductButton: React.FC<AddProductButtonProps> = ({
  addProduct,
}) => {
  return (
    <Button variant="primary" onClick={addProduct} className="m-2">
      Add
    </Button>
  );
};
