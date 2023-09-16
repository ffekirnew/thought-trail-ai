import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://thoughttrail-api.fikernew-birhanu.me"
})

export interface FetchResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: any;
}

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async () => {
    return axiosInstance.get<FetchResponse<T[]>>(this.endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.data);
  }

  get = async(_id?: string) => {
    return axiosInstance.get<FetchResponse<T>>(this.endpoint + "/" + _id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.data);
  }

  create = async (data: T) => {
    return axiosInstance.post<FetchResponse<T>>(this.endpoint, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.data);
  }

  update = async (_id: string, data: T) => {
    return axiosInstance.put<FetchResponse<T>>(this.endpoint + "/" + _id, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.data);
  }

  delete = async (_id: string) => {
    return axiosInstance.delete<FetchResponse<T>>(this.endpoint + "/" + _id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.data);
  }
}

export default ApiClient;
