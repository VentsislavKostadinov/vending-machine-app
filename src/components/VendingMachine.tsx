import React, { useState, useEffect } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Col, Container, Row, Button } from "react-bootstrap";
import { ProductList } from "./ProductList";
import { ProductProps } from "../model/Products";
import { CoinInput } from "./CoinInput";
import { ChangeSectionDisplay } from "./ChangeSectionDisplay";
import { calculateChange } from "../utils/changeCalculator";
import { ProductForm } from "./ProductForm";
import { ErrorHandling } from "../common/ErrorHandling";
import { LoadingHandling } from "../common/LoadingHandling";
import { InsertedCoins } from "./InsertedCoins";
import { DeleteProductDropdown } from "../common/DeleteProductDropdown";
import { StyledContainer } from "../common/styled-components/StyledContainer";

export const VendingMachine: React.FC = () => {
  const { data: products, loading, error } = useFetchProducts();
  const [productState, setProductState] = useState<ProductProps[]>([]);
  const [editProduct, setEditProduct] = useState<ProductProps | null>(null);
  const [resetSelectedProductId, setResetSelectedProductId] = useState<
    number | null
  >(null);
  const [change, setChange] = useState<{ [key: number]: number }>({});
  const [coins, setCoins] = useState<number>(0);
  const [resetFlag, setResetFlag] = useState<boolean>(false);

  useEffect(() => {
    if (products) {
      setProductState(products);
    }
  }, [products]);

  const selectProduct = (product: ProductProps) => {
    setResetSelectedProductId(product.id);

    if (coins >= product.price) {
      const newProducts = productState.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setProductState(newProducts);
      setChange(
        calculateChange(coins - product.price, [0.25, 0.1, 0.05, 0.01])
      );
      setCoins(0);
      resetSelectedProduct();
      setResetSelectedProductId(null);
      alert("Product bought successfully");
    } else {
      alert("Not enough coins");
    }
  };

  const editProductHandler = (product: ProductProps) => {
    setEditProduct(product);
    setResetSelectedProductId(product.id);
  };

  const insertCoin = (value: number) => {
    setCoins(coins + value);
  };

  const resetSelectedProduct = () => {
    setEditProduct(null);
    setResetFlag(true);
  };

  const reset = () => {
    setChange(calculateChange(coins, [0.25, 0.1, 0.05, 0.01]));
    setCoins(0);
    resetSelectedProduct();
  };

  const handleDeleteProduct = (id: number) => {
    setProductState(productState.filter((product) => product.id !== id));
  };

  if (loading) return <LoadingHandling />;
  if (error) return <ErrorHandling />;

  return (
    <StyledContainer>
      <Container>
        <Row>
          <Col md={10} sm={12}>
            <ProductList
              products={productState}
              onSelect={selectProduct}
              onEdit={editProductHandler}
              selectedProductId={resetSelectedProductId}
              resetFlag={resetFlag}
              clearResetFlag={() => setResetFlag(false)}
              resetSelectedProduct={resetSelectedProduct}
            />
          </Col>
          <Col md={2} sm={12}>
            <CoinInput onInsert={insertCoin} coins={coins} />
          </Col>
        </Row>
        <Row>
          <Col md={10} sm={12}>
            <ProductForm
              products={productState}
              setProducts={setProductState}
              selectedProduct={editProduct}
              resetSelectedProduct={resetSelectedProduct}
            />
          </Col>
          <Col md={2} sm={12}>
            <InsertedCoins coins={coins} />
            <ChangeSectionDisplay change={change} />
            <Button variant="dark" onClick={reset} className="m-2">
              Reset
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <DeleteProductDropdown
              products={productState}
              deleteProduct={handleDeleteProduct}
            />
          </Col>
        </Row>
      </Container>
    </StyledContainer>
  );
};

