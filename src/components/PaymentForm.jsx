import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import "../css/crm&pay.css";
import "../css/popup.css"

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    numberError: null,
    expiryError: null,
    nameError: null,
    cvcError: null,
  });

  const [orderId, setOrderId] = useState({});
  const navigate = useNavigate();
  const id = jwt_decode(localStorage.token)._id;

  useEffect(() => {
    const withdrawalOfOrderId = async () => {
      try {
        const order = await axios.get("/orders/my-order-findOne/" + id);
        setOrderId(order.data);
      } catch (err) {
        toast.error("Error, no reservation exists");
      }
    };
    withdrawalOfOrderId();
  }, []);

  const handelButtonPay = async () => {
    try {
      await axios.patch("/orders/orderStatus/" + orderId);
      toast.success("An order is currently in the works");
      navigate(ROUTES.HOME)
    } catch (err) {
      toast.error("Error, no reservation exists");
    }
  };

  const validateCVV = (value) => {
    if (value.length !== 3) {
      setState((prev) => ({
        ...prev,
        cvc: value.substring(0, 3),
        cvcError: "cvc must contain 3 numbers",
      }));
    } else {
      setState((prev) => ({ ...prev, cvc: value, cvcError: "" }));
    }
  };

  const validateCardNumber = (value) => {
    if (value.length < 14 || value.length > 16) {
      setState((prev) => ({
        ...prev,
        number: value.substring(0, 16),
        numberError: "Card number must be between 14 and 16 digits",
      }));
    } else {
      setState((prev) => ({ ...prev, number: value, numberError: "" }));
    }
  };

  const validateExpiration = (value) => {
    const formattedValue = value.replace(/\D/g, "").substring(0, 4);
    if (formattedValue.length !== 4) {
      setState((prev) => ({
        ...prev,
        expiry: formattedValue,
        expiryError: "Invalid expiration date",
      }));
    } else {
      setState((prev) => ({
        ...prev,
        expiry: formattedValue,
        expiryError: "",
      }));
    }
  };

  const validateName = (value) => {
    if (value.length > 16) {
      setState((prev) => ({
        ...prev,
        name: value.substring(1, 16),
        nameError: "Name can't exceed 16 characters",
      }));
    } else {
      setState((prev) => ({ ...prev, name: value, nameError: "" }));
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));

    if (name === "cvc") {
      validateCVV(value);
    }
    if (name === "number") {
      validateCardNumber(value);
    }
    if (name === "expiry") {
      validateExpiration(value);
    }
    if (name === "name") {
      validateName(value);
    }
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <Container>
      <h1 className="title">Payment</h1>
      <div className="paymentCard">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <Col md={{ span: 6, offset: 4 }} xs={12}>
        <form>
          <input
            className="paymentForm"
            type="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {state.numberError && <p className="error">{state.numberError}</p>}
        </form>
        <form>
          <input
            className="paymentForm"
            type="number"
            name="expiry"
            placeholder="Card expiry"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {state.expiryError && <p className="error">{state.expiryError}</p>}
        </form>
        <form>
          <input
            className="paymentForm"
            type="number"
            name="cvc"
            placeholder="Card cvc"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {state.cvcError && <p className="error">{state.cvcError}</p>}
        </form>
        <form>
          <input
            className="paymentForm"
            type="focus"
            name="name"
            placeholder="Card name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {state.nameError && <p className="error">{state.nameError}</p>}
        </form>
      <Button
        className="buttonPay"
        variant="warning"
        onClick={handelButtonPay}
        disabled={
          state.nameError === null ||
          state.expiryError === null ||
          state.numberError === null ||
          state.cvcError === null
        }
      >
        Pay
      </Button>
      </Col>
      </div>
    </Container>
  );
};

export default PaymentForm;
