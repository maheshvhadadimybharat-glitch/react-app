import { apiClient } from "../../../services/apiClient";

export const getUsers = async () => {
  const res = await apiClient.get("/users");
  return res.data;
}