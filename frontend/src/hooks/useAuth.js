import { useSelector } from "react-redux";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const authDisabled = import.meta.env.VITE_AUTH_DISABLED === "true";

  const isAuthenticated = authDisabled ? Boolean(auth.user) : Boolean(auth.token);
  return {
    ...auth,
    isAuthenticated,
    isAdmin: auth.user?.role === "admin",
    authDisabled,
  };
};

export default useAuth;
