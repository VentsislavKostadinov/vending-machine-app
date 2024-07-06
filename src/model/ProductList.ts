import { ProductProps } from "./Products";

export type ProductListProps = {
  products: ProductProps[];
  onSelect: (product: ProductProps) => void;
};
