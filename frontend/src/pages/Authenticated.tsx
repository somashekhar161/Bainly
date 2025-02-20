import { Navigate, Outlet } from "react-router-dom";

import { useUserStore } from "../store";

function Authenticated() {
  const user = useUserStore((state) => state.username);
  const userloading = useUserStore((state) => state.userLoading);
  if (userloading) {
    return <>Loading</>;
  }

  return user && user != "" ? <Outlet /> : <Navigate to={"/signin"} />;
}

export default Authenticated;
