import React, { useState, useEffect } from "react";
import { ProductProps } from "../model/Products";
import { Form, Col, InputGroup } from "react-bootstrap";
import { ProductFormProps } from "../model/AddProductForm";
import { AddProductButton } from "../common/AddProductButton";
import { UpdateProductButton } from "../common/UpdateProductButton";
import { StyledForm } from "../common/styled-components/StyledForm";

export const ProductForm: React.FC<ProductFormProps> = ({
  products,
  setProducts,
  selectedProduct,
  resetSelectedProduct,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        price: selectedProduct.price.toString(),
        quantity: selectedProduct.quantity.toString(),
      });
    }
  }, [selectedProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addProduct = () => {
    const quantityValue = parseInt(formData.quantity, 10);

    if (quantityValue > 15) {
      alert("Quantity cannot exceed 15.");
      return;
    }

    if (products.some((product) => product.name === formData.name)) {
      alert("Product with this name already exists.");
      return;
    }

    const newProduct: ProductProps = {
      id: products.length + 1,
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: quantityValue,
    };

    setProducts([...products, newProduct]);
    resetInputFields();
  };

  const updateProduct = (id: number) => {
    const quantityValue = parseInt(formData.quantity, 10);

    if (quantityValue > 15) {
      alert("Quantity cannot exceed 15.");
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              name: formData.name,
              price: parseFloat(formData.price),
              quantity: quantityValue,
            }
          : product
      )
    );
    resetInputFields();
    resetSelectedProduct();
  };

  const resetInputFields = () => {
    setFormData({
      name: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <div>
      <StyledForm>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label />
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPrice">
          <Form.Label />
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridQuantity">
          <Form.Label />
          <Form.Control
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </Form.Group>

        {selectedProduct ? (
          <UpdateProductButton
            updateProduct={() => updateProduct(selectedProduct.id)}
            productId={selectedProduct.id}
          />
        ) : (
          <AddProductButton addProduct={addProduct} />
        )}
      </StyledForm>
    </div>
  );
};
