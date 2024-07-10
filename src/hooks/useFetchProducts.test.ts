import { renderHook } from "@testing-library/react";
import useAxios from "axios-hooks";
import { useFetchProducts } from "./useFetchProducts";
import { mockProducts } from "../test-utils/products";

jest.mock("axios-hooks");

describe("useFetchProducts custom hooh", () => {
  it("should return data if successful", async () => {
    //@ts-ignore
    (useAxios as jest.Mock).mockReturnValue([
      { data: mockProducts, loading: false, error: null },
    ]);

    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should return loading as true while the API is calling", async () => {
    //@ts-ignore
    (useAxios as jest.Mock).mockReturnValue([
      { data: null, loading: true, error: null },
    ]);

    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should return an error when the API call fails", async () => {
    const mockError = new Error("Failed to fetch");
    //@ts-ignore
    (useAxios as jest.Mock).mockReturnValue([
      { data: null, loading: false, error: mockError },
    ]);

    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });
});
