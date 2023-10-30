import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ROUTES from "./ROUTES";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import MenuPage from "../pages/MenuPage";
import EditCardPage from "../pages/EditCardPage";
import CreateCardPage from "../pages/CreateCardPage";
import CRMPage from "../pages/crmPage";
import AboutPage from "../pages/AboutPage";
import ProtectedRoute from "../components/ProtectedRoute";
import MenuLogoutPage from "../pages/NoLoginMenuPage";
import PaymentForm from "../components/PaymentForm";
import MyOrder from "../pages/MyOrder";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import Contact from "../pages/Contact";
import Profail from "../pages/Profail";
import OrderDetails from "../pages/OrderDetails";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MENULOGUT} element={<MenuLogoutPage />} />
      <Route path={ROUTES.LOGOUT} element={<ProtectedRoute />} />
      <Route path={ROUTES.CONTACT} element={<Contact />} />
      <Route path="/crm/:id" element={<OrderDetails />} />
      <Route path={ROUTES.PROFAIL} element={<Profail />} />
      <Route
        path={ROUTES.MENU}
        element={<ProtectedRoute element={<MenuPage />} />}
      />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute isAdmin={true} element={<EditCardPage />} />
        }
      />
      <Route
        path={ROUTES.CRM}
        element={<SuperProtectedRoute isAdmin={true} element={<CRMPage />} />}
      />
      <Route
        path={ROUTES.PAYMENT}
        element={<ProtectedRoute element={<PaymentForm />} />}
      />
      <Route
        path={ROUTES.MYORDER}
        element={<ProtectedRoute element={<MyOrder />} />}
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute isAdmin={true} element={<CreateCardPage />} />
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
