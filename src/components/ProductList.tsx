import { ListGroup, Button } from "react-bootstrap";
import { ProductListProps } from "../model/ProductList";
import { StyledProductList } from "../common/styled-components/StyledProductList";

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onSelect,
}) => {
  return (
    <StyledProductList>
      <h2>Products</h2>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.id}>
            <ListGroup.Item>{product.name} </ListGroup.Item>
            <ListGroup.Item>
              ${product.price.toFixed(2)} ({product.quantity} left)
            </ListGroup.Item>
            <Button onClick={() => onSelect(product)} className="float-right">
              Select
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </StyledProductList>
  );
};
