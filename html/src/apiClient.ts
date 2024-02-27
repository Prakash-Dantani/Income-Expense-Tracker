import axios from "axios";

const token =
  localStorage.getItem("token") ?? localStorage.getItem("admin_token");
//   if(!token){
//     navigator("/login");
//     return;
//   }
const apiClient = axios.create({
  baseURL: "https://cadencehospitality.co.uk/cadence_api/public/api/live/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

export default apiClient;


apiClient.post("get_user");