import authService from "../../services/authClient";
import { useState } from "react";

const useLogin = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const login = (username: string, password: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    authService.login(username, password).then((res) => {
      setSuccess(true);
      const { user, token } = res.data;

      // save the token to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); 

    }).catch((error: Error) => {
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    })
  }

  return { isLoading, isSuccess, error, login };
}

export default useLogin;
