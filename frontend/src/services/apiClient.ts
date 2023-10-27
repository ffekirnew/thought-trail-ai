import axios from "axios"

export interface FetchResponse<T> {
  success: boolean
  message: string
  data: T
  error: any
}

class ApiClient<T> {
  endpoint: string
  axiosInstance

  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.axiosInstance = axios.create({
      baseURL: "https://thoughttrail-api.fikernew-birhanu.me",
      // baseURL: "http://localhost:3000"
    })
  }

  getAll = async () => {
    return this.axiosInstance
      .get<FetchResponse<T[]>>(this.endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
  }

  get = async (_id?: string) => {
    return this.axiosInstance
      .get<FetchResponse<T>>(this.endpoint + "/" + _id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
  }

  create = async (data: T) => {
    return this.axiosInstance
      .post(this.endpoint, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
  }

  update = async (_id: string, data: T) => {
    return this.axiosInstance
      .put(this.endpoint + "/" + _id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
  }

  delete = async (_id: string) => {
    return this.axiosInstance
      .delete(this.endpoint + "/" + _id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
  }
}

export default ApiClient
