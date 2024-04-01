import axios from "axios";

let token = localStorage.getItem("x-auth-token") ?? "";
//   if(!token){
//     navigator("/login");
//     return;
//   }

import { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results?: T[];
  data?: T[];
  message?: string | null;
}

export const axiousInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "x-auth-token": token,
  },
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    token = localStorage.getItem("x-auth-token") ?? "";
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiousInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  post = (formData) => {
    return axiousInstance.post(this.endpoint, formData).then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiousInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  selectAll = () => {
    return axiousInstance.get<T>(this.endpoint).then((res) => res.data);
  };
}
export default APIClient;
