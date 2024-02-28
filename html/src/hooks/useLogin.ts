import { useQuery } from "@tanstack/react-query";
// import platforms from "../data/platforms";
import ms from "ms";
import APIClient from "../services/apiClient";
import { Login } from "../entities/Login";
const apiClient = new APIClient<Login>('/auth/login');
const usePlatforms = () =>useQuery({
    queryKey:['login'],
    queryFn:apiClient.getAll,
    staleTime:ms('24H'),
}) 

export default usePlatforms;