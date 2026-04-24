import useAxios from "axios-hooks";
import { ProductProps } from "../model/Products";

export const useFetchProducts = () => {
  const [{ data, loading, error }, refetch] = useAxios<ProductProps[]>(
    process.env.REACT_APP_PRODUCTS_API as string,
  );

  return {
    data: data,
    loading,
    error,
    refetch,
  };
};
