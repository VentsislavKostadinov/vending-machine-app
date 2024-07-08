import { ProductProps } from "./Products";

export type ProductListProps = {
  products: ProductProps[];
  onSelect: (product: ProductProps) => void;
  onEdit: (product: ProductProps) => void;
  selectedProductId: number | null;
  resetSelectedProduct: () => void;
  resetFlag: boolean;
  clearResetFlag: () => void;
};
