import { ListGroup } from "react-bootstrap";
import { ProductListProps } from "../model/ProductList";
import { StyledProductList } from "../common/styled-components/StyledProductList";
import { useEffect, useState } from "react";
import { ProductProps } from "../model/Products";
import { StyledButton } from "../common/styled-components/StyledButton";

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onSelect,
  selectedProductId
}) => {
  const [localSelectedProductId, setLocalSelectedProductId] = useState<
    number | null
  >(null);

  useEffect(() => {
    setLocalSelectedProductId(selectedProductId);
  }, [selectedProductId]);

  const handleSelect = (product: ProductProps) => {
    setLocalSelectedProductId(product.id);
    onSelect(product);
  };

  return (
    <StyledProductList>
      <h2>Products</h2>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.id}>
            <ListGroup.Item>{product.name}</ListGroup.Item>
            <ListGroup.Item>
              ${product.price.toFixed(2)} ({product.quantity} left)
            </ListGroup.Item>
            <StyledButton
              variant="primary"
              onClick={() => {
                handleSelect(product);
              }}
              className={localSelectedProductId === product.id ? "active" : ""}
            >
              {localSelectedProductId === product.id ? "Selected" : "Select"}
            </StyledButton>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </StyledProductList>
  );
};
