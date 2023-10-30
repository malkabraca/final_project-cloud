import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const SuperProtectedRouteEdit = ({ element, isAdmin, isBiz }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const location = useLocation();
  if (isLoggedIn) {
    if (
      (isAdmin && payload && payload.isAdmin) ||
      (isBiz && payload && payload.biz)
    ) {
      if(location.state&&location.state.user_id&&location.state.user_id==payload._id){
      return element;
      }
    }
  }
  toast.error("invalid permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};
export default SuperProtectedRouteEdit;
