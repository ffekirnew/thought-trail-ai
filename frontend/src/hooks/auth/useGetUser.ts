import { User } from "../../services/authClient";

const useGetUser = (): User => {
  const user = localStorage.getItem("user");

  if (user)
    return JSON.parse(user) as User;

  return {} as User;
}

export default useGetUser;
