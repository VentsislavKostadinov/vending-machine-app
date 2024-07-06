import React, { useState, useEffect } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Col, Container, Row } from "react-bootstrap";
import { ProductList } from "./ProductList";
import { ProductProps } from "../model/Products";

export const VendingMachine: React.FC = () => {
  const { data: products, loading, error } = useFetchProducts();
  const [productState, setProductState] = useState<ProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null,
  );

  console.log(products);

  useEffect(() => {
    if (products) {
      setProductState(products);
    }
  }, [products]);

  const selectProduct = (product: ProductProps) => {
    setSelectedProduct(product);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <Container>
      <Row>
        <Col>
          <ProductList products={productState} onSelect={selectProduct} />
        </Col>
      </Row>
    </Container>
  );
};
