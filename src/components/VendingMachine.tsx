import React, { useState, useEffect } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductList } from "./ProductList";
import { ProductProps } from "../model/Products";
import { CoinInput } from "./CoinInput";
import { ChangeSectionDisplay } from "./ChangeSectionDisplay";
import { calculateChange } from "../utils/changeCalculator";
import { ProductForm } from "./ProductForm";
import { ErrorHandling } from "../common/ErrorHandling";
import { LoadingHandling } from "../common/LoadingHandling";

export const VendingMachine: React.FC = () => {
  const { data: products, loading, error } = useFetchProducts();
  const [productState, setProductState] = useState<ProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [editProduct, setEditProduct] = useState<ProductProps | null>(null);
  const [resetSelectedProductId, setResetSelectedProductId] = useState<number | null>(null);
  const [change, setChange] = useState<{ [key: number]: number }>({});
  const [coins, setCoins] = useState<number>(0);
  const [resetFlag, setResetFlag] = useState<boolean>(false);

  useEffect(() => {
    if (products) {
      setProductState(products);
    }
  }, [products]);

  const selectProduct = (product: ProductProps) => {
    setSelectedProduct(product);
    setResetSelectedProductId(product.id);
  };

  const editProductHandler = (product: ProductProps) => {
    setEditProduct(product);
    setResetSelectedProductId(product.id);
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
        resetSelectedProduct();
        setResetSelectedProductId(null);
        console.log("Product bought successfully");
      } else {
        console.log("Not enough coins");
      }
    } else {
      console.log("No product selected");
    }
  };

  const resetSelectedProduct = () => {
    setSelectedProduct(null);
    setEditProduct(null); // Clear edit product state as well
    setResetFlag(true); // Signal reset
  };

  const reset = () => {
    setChange(calculateChange(coins, [0.25, 0.1, 0.05, 0.01]));
    setCoins(0);
    resetSelectedProduct();
  };

  if (loading) return <LoadingHandling />;
  if (error) return <ErrorHandling />;

  return (
    <Container>
      <Row>
        <Col md={10}>
          <ProductList
            products={productState}
            onSelect={selectProduct}
            onEdit={editProductHandler}
            selectedProductId={resetSelectedProductId}
            resetFlag={resetFlag} // Pass reset flag
            clearResetFlag={() => setResetFlag(false)} // Pass function to clear reset flag
            resetSelectedProduct={resetSelectedProduct}      />
        </Col>
        <Col md={2}>
          <CoinInput onInsert={insertCoin} coins={coins} />
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
          <ProductForm
            products={productState}
            setProducts={setProductState}
            selectedProduct={editProduct}
            resetSelectedProduct={resetSelectedProduct}
          />
        </Col>
      </Row>
    </Container>
  );
};
