import { apiClient } from "../../../services/apiClient";

type loginPlayload = {
  email:string,
  password:string
}

export const loginApi = async (data: loginPlayload)=> {
  const res = await apiClient.post("/login", data);
  return res.data;
}