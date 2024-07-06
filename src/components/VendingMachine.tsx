import React, { useState, useEffect } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Col, Container, Row } from "react-bootstrap";
import { ProductList } from "./ProductList";
import { ProductProps } from "../model/Products";
import { CoinInput } from "./CoinInput";

export const VendingMachine: React.FC = () => {
  const { data: products, loading, error } = useFetchProducts();
  const [productState, setProductState] = useState<ProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null,
  );
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    if (products) {
      setProductState(products);
    }
  }, [products]);

  const selectProduct = (product: ProductProps) => {
    setSelectedProduct(product);
  };

  const insertCoin = (value: number) => {
    setCoins(coins + value);
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
      <Row>
        <Col>
          <CoinInput onInsert={insertCoin} />
        </Col>
      </Row>
    </Container>
  );
};
