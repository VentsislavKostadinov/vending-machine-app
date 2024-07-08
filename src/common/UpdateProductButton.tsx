import React from "react";
import { Button } from "react-bootstrap";
import { UpdateProductButtonProps } from "../model/UpdateProductButton";

export const UpdateProductButton: React.FC<UpdateProductButtonProps> = ({
  updateProduct,
  productId,
}) => {

  const handleUpdate = () => {
    updateProduct(productId);
  };

  return (
    <Button
      variant="warning"
      onClick={handleUpdate}
      className="m-2"
    >
      Update
    </Button>
  );
};
