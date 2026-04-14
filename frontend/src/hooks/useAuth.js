import { useSelector } from "react-redux";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  return {
    ...auth,
    isAuthenticated: Boolean(auth.token),
    isAdmin: auth.user?.role === "admin",
  };
};

export default useAuth;
