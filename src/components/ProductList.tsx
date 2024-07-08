import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { ProductListProps } from "../model/ProductList";
import { StyledProductList } from "../common/styled-components/StyledProductList";
import { ProductProps } from "../model/Products";
import { StyledButton } from "../common/styled-components/StyledButton";
import { StyledListGroup } from "../common/styled-components/StyledListGroup";

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onSelect,
  onEdit,
  selectedProductId,
  resetFlag,
  clearResetFlag,
}) => {
  const [localSelectedProductId, setLocalSelectedProductId] = useState<
    number | null
  >(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  useEffect(() => {
    setLocalSelectedProductId(selectedProductId);
  }, [selectedProductId]);

  useEffect(() => {
    if (resetFlag) {
      setLocalSelectedProductId(null);
      setEditingProductId(null);
      clearResetFlag();
    }
  }, [resetFlag, clearResetFlag]);

  const handleSelect = (product: ProductProps) => {
    setLocalSelectedProductId(product.id);
    setEditingProductId(null);
    onSelect(product);
  };

  const handleEdit = (product: ProductProps) => {
    setEditingProductId(product.id);
    onEdit(product);
  };

  return (
    <StyledProductList>
      <h2>Products</h2>
      <StyledListGroup>
        {products.map((product) => (
          <ListGroup.Item
            key={product.id}
            className={localSelectedProductId === product.id ? "selected" : ""}
          >
            <div>{product.name}</div>
            <div>
              ${product.price.toFixed(2)} ({product.quantity} left)
            </div>
            <StyledButton
              variant="primary"
              onClick={() => handleSelect(product)}
              className={
                localSelectedProductId === product.id &&
                editingProductId === null
                  ? "active"
                  : ""
              }
            >
              {localSelectedProductId === product.id &&
              editingProductId === null
                ? "Selected"
                : "Select"}
            </StyledButton>
            <Button variant="info" onClick={() => handleEdit(product)}>
              Edit
            </Button>
          </ListGroup.Item>
        ))}
      </StyledListGroup>
    </StyledProductList>
  );
};

