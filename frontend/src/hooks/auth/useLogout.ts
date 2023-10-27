const useLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export default useLogout
