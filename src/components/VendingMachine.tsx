import React, { useState, useEffect } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductList } from "./ProductList";
import { ProductProps } from "../model/Products";
import { CoinInput } from "./CoinInput";
import { ChangeSectionDisplay } from "./ChangeSectionDisplay";
import { calculateChange } from "../utils/changeCalculator";
import { ProductForm } from "./ProductForm";

export const VendingMachine: React.FC = () => {
  const { data: products, loading, error } = useFetchProducts();
  const [productState, setProductState] = useState<ProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );
  const [change, setChange] = useState<{ [key: number]: number }>({});
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

  const buyProduct = () => {
    if (selectedProduct) {
      if (coins >= selectedProduct.price) {
        const newProducts = productState.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        );
        setProductState(newProducts);
        setChange(
          calculateChange(
            coins - selectedProduct.price,
            [0.25, 0.1, 0.05, 0.01]
          )
        );
        setCoins(0);
        setSelectedProduct(null);
        console.log("Product bought successfully");
      } else {
        console.log("Not enough coins");
      }
    } else {
      console.log("No product selected");
    }
  };

  const reset = () => {
    setChange(calculateChange(coins, [0.25, 0.1, 0.05, 0.01]));
    setCoins(0);
    setSelectedProduct(null);
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
      <Row>
        <Col>
          <Button variant="success" onClick={buyProduct} className="m-2">
            Buy
          </Button>
          <Button variant="info" onClick={reset} className="m-2">
            Reset
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ChangeSectionDisplay change={change} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductForm products={productState} setProducts={setProductState} />
        </Col>
      </Row>
    </Container>
  );
};
