import axios from "axios"
import { FetchResponse } from "./apiClient"

const axiosInstance = axios.create({
  baseURL: "https://thoughttrail-api.fikernew-birhanu.me/",
})

export interface User {
  _id: string
  name: string
  username: string
  email: string
  profilePicture: string
  numberOfJournals: number
  numberOfCollections: number
}

export interface LoggedInUser {
  user: User
  token: string
}

class AuthClient {
  endpoint: string

  constructor() {
    this.endpoint = "/auth"
  }

  login = async (username: string, password: string) => {
    return axiosInstance
      .post<FetchResponse<LoggedInUser>>(`${this.endpoint}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw new Error(error.response.data.error)
      })
  }

  register = async (
    username: string,
    name: string,
    email: string,
    password: string,
  ) => {
    return axiosInstance
      .post<FetchResponse<LoggedInUser>>(
        `${this.endpoint}/register-no-verification`,
        {
          username: username,
          password: password,
          name: name,
          email: email,
        },
      )
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw new Error(error.response.data.error)
      })
  }
}

export default new AuthClient()
