import React, { useState } from "react";
import { ProductProps } from "../model/Products";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import { ProductFormProps } from "../model/AddProductForm";
import { AddProductButton } from "../common/AddProductButton";
import { UpdateProductButton } from "../common/UpdateProductButton";
import { DeleteProductDropdown } from "../common/DeleteProductDropdown";

export const ProductForm: React.FC<ProductFormProps> = ({
  products,
  setProducts,
}) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const addProduct = () => {
    const quantityValue = parseInt(quantity, 10);

    if (quantityValue > 15) {
      alert("Quantity cannot exceed 15.");
      return;
    }

    const existingProduct = products.find((product) => product.name === name);
    if (existingProduct) {
      alert("Product with this name already exists.");
      return;
    }

    const newProduct: ProductProps = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
      quantity: quantityValue,
    };

    setProducts([...products, newProduct]);
    resetInputFields();
  };

  const updateProduct = (id: number) => {
    const quantityValue = parseInt(quantity, 10);

    if (quantityValue > 15) {
      alert("Quantity cannot exceed 15.");
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              name,
              price: parseFloat(price),
              quantity: quantityValue,
            }
          : product
      )
    );
    resetInputFields();
  };

  const resetInputFields = () => {
    setName("");
    setPrice("");
    setQuantity("");
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <Form>
        <Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label />
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label />
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuantity">
            <Form.Label />
            <Form.Control
              type="text"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <AddProductButton addProduct={addProduct} />
            <UpdateProductButton
              updateProduct={updateProduct}
              productId={products.length}
            />
          </Col>
        </Row>
      </Form>
      <DeleteProductDropdown
        products={products}
        deleteProduct={deleteProduct}
      />
      {/*  <h2>Delete Product</h2>
      <Form.Group controlId="formGridDelete">
        <Form.Control
          as="select"
          onChange={(e) => deleteProduct(Number(e.target.value))}
        >
          <option value="">Select a product to delete</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group> */}
    </div>
  );
};
