import { ProductProps } from "./Products";

export type DeleteProductDropdownProps = {
  products: ProductProps[];
  deleteProduct: (val: number) => void;
};
