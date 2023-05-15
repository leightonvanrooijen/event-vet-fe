import axios, { AxiosResponse } from "axios";
import { procedureUrl } from "../../App";

export const post = async <
  T extends Record<string, any>,
  U extends Record<string, string | number> = Record<string, string | number>
>(
  endpoint: string,
  data: U
): Promise<AxiosResponse<T>> => {
  return await axios.post<T>(`${procedureUrl}${endpoint}`, data);
};
