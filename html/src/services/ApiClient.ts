import axios from "axios";

const token = localStorage.getItem("x-auth-token") ?? "";
//   if(!token){
//     navigator("/login");
//     return;
//   }
// const ApiClient = axios.create({
//   baseURL: "http://localhost:3000/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//     Accept: "application/json",
//   },
// });

// export default ApiClient;


// ApiClient.post("get_user");


import { AxiosRequestConfig } from "axios"

export interface FetchResponse<T>{
    count:number,
    next:string | null,
    results:T[],
}

const axiousInstance = axios.create({
    baseURL: "http://localhost:3000/",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
		Accept: "application/json",
	},
});

class APIClient<T>{
    endpoint:string;
    constructor(endpoint:string){
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiousInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res.data);
    }
    
	login = (config: AxiosRequestConfig) => {
        return axiousInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res.data);
    }

    get = (id:number|string) => {
        return axiousInstance.get<T>(this.endpoint+'/'+id).then(res => res.data);
    }
}
export default APIClient;

