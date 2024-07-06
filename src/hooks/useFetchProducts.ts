import useAxios from "axios-hooks";
import { ProductProps } from "../model/Products";

export const useFetchProducts = () => {
  const [{ data, loading, error }] = useAxios<ProductProps[]>({
    url: `${process.env.REACT_APP_PRODUCTS_API}`,
  });
  return { data, loading, error };
};
