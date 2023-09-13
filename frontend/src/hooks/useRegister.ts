import authService from "../services/authClient";
import { useState } from "react";

const useRegister = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const register = (name: string, email: string, username: string, password: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    authService.register(username, name, email, password).then((res) => {
      setSuccess(true);
      const { user, token } = res.data;

      // save the token to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); 

    }).catch((error: Error) => {
      console.log(error);
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    })
  }

  return { isLoading, isSuccess, error, register };
}

export default useRegister;
