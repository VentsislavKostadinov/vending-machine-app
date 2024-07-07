import { ProductProps } from "./Products";

export type ProductListProps = {
  products: ProductProps[];
  onSelect: (product: ProductProps) => void;
  selectedProductId: number | null;
  resetSelectedProduct: () => void;
};
