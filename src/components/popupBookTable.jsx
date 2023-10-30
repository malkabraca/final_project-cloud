import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validateTableOrders from "../validation/orderTableValidtion";
import ROUTES from "../routes/ROUTES";
import PopuoFrom from "../components/popuoFrom";
import { useSelector } from "react-redux";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
} from "react-icons/bs";

const PopupBookTable = () => {
  const [inputState, setInputState] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    numOfPeople: "",
  });
  const [from, setFrom] = useState(false);
  const [inputsErrorState, setInputsErrorState] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);


  const handeleBtnContinued = () => {
    setFrom(!from);
  };

  const handeleBtnClick = async (ev) => {
    try {
      const joiResponse = validateTableOrders(inputState);
      setInputsErrorState(joiResponse);

      if (joiResponse) {
        toast.error("Invalid user information");
        return;
      }

      await axios.post("/ordersTable", inputState);
      toast.success("The registration was done successfully");
      setInputState({
        name: "",
        phone: "",
        date: "",
        time: "",
        numOfPeople: "",
      });
      setFrom(!from);
      handleClose();
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("Invalid user information");
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateTableOrders(newInputState);
    setInputsErrorState(joiResponse);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlButtenOrder = () => {
    if (!payload) {
      toast.warning(
        "Note that registration and login are required to place an order"
      );
      return;
    }
    setShow(true);
  };

  const generateTimeOptions = () => {
    const selectedDate = new Date(inputState.date);
    const currentDate = new Date();

    let startHour = 11;
    let endHour = 23;

    if (
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    ) {
      const currentHour = currentDate.getHours();
      startHour = currentHour < 11 ? 11 : currentHour;
    }

    const options = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = String(hour).padStart(2, '0');
      options.push(
        <option key={formattedHour} value={`${formattedHour}:00`}>
          {formattedHour}:00
        </option>
      );
    }

    return options;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const keys = ["name", "phone"];

  return (
    <div>
      <Button
        variant="warning"
        onClick={handlButtenOrder}
        className="buttonhome"
      >
        Book a table
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="colinput">
          <Modal.Title>my order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-page">
            <Form>
              <Row className="mb-3">
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      id="date"
                      type="date"
                      value={inputState.date}
                      onChange={handleInputChange}
                      required
                      className="inputBookTable"
                      min={getCurrentDate()}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Select
                      as="select"
                      id="time"
                      value={inputState.time}
                      onChange={handleInputChange}
                      required
                      className="inputBookTable"
                    >
                      <option value="">Choose a time</option>
                      {generateTimeOptions()}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="formNumOfPeople">
                    <Form.Label>Number of guests</Form.Label>
                    <Form.Select
                      as="select"
                      id="numOfPeople"
                      value={inputState.numOfPeople}
                      onChange={handleInputChange}
                      required
                      className="inputBookTable"
                    >
                      {Array.from({ length: 10 }, (v, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num} Guests
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Col md={{ span: 6, offset: 4 }} xs={12}>
              <Button
                variant="warning"
                onClick={handeleBtnContinued}
                className="colinput"
              >
                <BsArrowRightShort />
                <BsArrowRightShort />
                Continued
                <BsArrowLeftShort />
                <BsArrowLeftShort />
              </Button>
            </Col>
          </div>
          {from ? (
            <Form>
              {keys.map((item) => (
                <PopuoFrom
                  key={item}
                  item={item}
                  inputState={inputState}
                  onChange={handleInputChange}
                  inputsErrorState={inputsErrorState}
                />
              ))}
            </Form>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={handeleBtnClick}
            className="colinput"
          >
            Book A Table
          </Button>
          <Button
            variant="warning"
            type="submit"
            onClick={handleClose}
            className="colinput"
          >
            Cansel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopupBookTable;
