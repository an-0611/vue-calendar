import axios, { AxiosResponse } from "axios";
import utils, { AnyJson } from "@/utils";

const port = 4000;
const apiEndpoint = `http://localhost:${port}/`;

export const instance = axios.create({
  baseURL: apiEndpoint,
  headers: {
    "Content-Type": "application/json",
  },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
instance.interceptors.response.use(
  (response: any) => {
    return utils.camelizeKeys(response.data) as unknown as AxiosResponse;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default function <T>(method: string, url: string, data: AnyJson = null) {
  const requestType = method.toLowerCase();
  const normalizedParams = utils.snakifyKeys(data);

  switch (requestType) {
    case "get":
      return instance.get(url, { params: normalizedParams }) as Promise<T>;
    case "put":
      return instance.put(url, normalizedParams) as Promise<T>;
    case "delete":
      return instance.delete(url, { params: normalizedParams }) as Promise<T>;
    case "post":
      return instance.post(url, normalizedParams) as Promise<T>;
    default:
      throw new Error(
        `Unknown request method of ${method}! You might have a typo.`
      );
  }
}
