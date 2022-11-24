import axios from "axios";
import { NewProductType } from "../components/AddProductForm/AddProductForm";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const createNewProduct = async (data: NewProductType) => {
  return await api.post("/products", data);
};