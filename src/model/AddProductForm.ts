import { ProductProps } from "./Products";

export type ProductFormProps = {
  products: ProductProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  selectedProduct: ProductProps | null;
  resetSelectedProduct: () => void;
};
