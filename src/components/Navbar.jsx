import React, { useState } from "react";
import "../css/navbar&foter.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ROUTES from "../routes/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import SearchPartial from "./SearchPartial";
import { Link, useNavigate } from "react-router-dom";
import ImageNavbar from "./ImageNavbar";
import "../css/media.css";
import { BsCart } from "react-icons/bs";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";

const Navbars = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const dispatch = useDispatch();
  const id = localStorage.token ? jwt_decode(localStorage.token)._id : null;
  
  const handleClick=async()=>{
    try {
      if (!payload) {
        return;
      }
      const { data } = await axios.get("orders/my-allorder-findOne/" + id);
      const status = data.orderStatus;
      if (!status) {
        navigate(ROUTES.MENU);
      }
      else{
        toast.warning("Attention ❤️ An order is required");
      }
    } catch (err) {
    toast.warning("Attention ❤️ An order is required");
    }
  }



  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  const handleLinkClick = (event) => {
    setActiveLink(event.target.innerText);
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav className={"navLink"}>
              <Link
                id="nav"
                to={ROUTES.HOME}
                onClick={handleLinkClick}
                className={activeLink === "Home" ? "active" : ""}
              >
                Home
              </Link>
            </Nav>
            <Nav className={"navLink"}>
              <Link
                id="nav"
                to={ROUTES.ABOUT}
                onClick={handleLinkClick}
                className={activeLink === "About" ? "active" : ""}
              >
                About
              </Link>
            </Nav>
            <Nav className={"navLink"}>
              <Link
                id="nav"
                to={ROUTES.CONTACT}
                onClick={handleLinkClick}
                className={activeLink === "Contact" ? "active" : ""}
              >
                Contact
              </Link>
            </Nav>
            {!isLoggedIn ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.MENULOGUT}
                  onClick={handleLinkClick}
                  className={activeLink === "Menu" ? "active" : ""}
                >
                  Menu
                </Link>
              </Nav>
            ) : (
              ""
            )}
            {isLoggedIn && !payload.isAdmin ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.MENULOGUT}
                  onClick={handleLinkClick}
                  className={activeLink === "Menu" ? "active" : ""}
                >
                  Menu
                </Link>
              </Nav>
            ) : (
              ""
            )}

            {isLoggedIn ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.MYORDER}
                  onClick={handleLinkClick}
                  className={activeLink === "My Order" ? "active" : ""}
                >
                  My Order
                </Link>
              </Nav>
            ) : (
              ""
            )}
            {!isLoggedIn ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.LOGIN}
                  onClick={handleLinkClick}
                  className={activeLink === "Login" ? "active" : ""}
                >
                  Login
                </Link>
              </Nav>
            ) : (
              ""
            )}
            {!isLoggedIn ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.REGISTER}
                  onClick={handleLinkClick}
                  className={activeLink === "Register" ? "active" : ""}
                >
                  Register
                </Link>
              </Nav>
            ) : (
              ""
            )}
            {isLoggedIn && payload.isAdmin ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.MENU}
                  onClick={handleLinkClick}
                  className={activeLink === "Menu" ? "active" : ""}
                >
                  Menu
                </Link>
              </Nav>
            ) : (
              ""
            )}
            {isLoggedIn && payload.isAdmin ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.CRM}
                  onClick={handleLinkClick}
                  className={activeLink === "CRM" ? "active" : ""}
                >
                  CRM
                </Link>
              </Nav>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <Nav className={"navLink"}>
                <Link
                  id="nav"
                  to={ROUTES.LOGOUT}
                  onClick={logoutClick}
                  className={activeLink === "Logout" ? "active" : ""}
                >
                  Logout
                </Link>
              </Nav>
            ) : (
              ""
            )}
          </Nav>
          {isLoggedIn ? (
            <Nav className={"navLink"}>
              <Link
                id="nav"
                // to={ROUTES.MENU}
                onClick={handleClick}
                className={activeLink === "Menu" ? "active" : ""}
              >
                <BsCart />
              </Link>
            </Nav>
          ) : (
            ""
          )}
          <SearchPartial />
          {isLoggedIn ? <ImageNavbar /> : ""}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
