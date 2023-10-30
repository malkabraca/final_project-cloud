import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import {  useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import TableOrder from "./TableOrder";
import Table from "react-bootstrap/Table";
import ROUTES from "../routes/ROUTES";

const CompletionOfAnOrder = ({ orderId }) => {
  const [totalSum, setTotalSum] = useState(0);
  const [show, setShow] = useState(false);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = jwt_decode(localStorage.token)._id;

  const completionOrderMenu = async () => {
    try {
      const orders = await axios.get("/orders/" + orderId);
      const completion = orders.data.menuOrder;
      return completion;
    } catch (err) {
      toast.error("Error, no reservation exists");
    }
  };

  const getOrderData = async () => {
    const orderArr = await completionOrderMenu();
    if (!orderArr) {
      return
    }
    let card = [];
    try {
      const cards = await axios.get("/cards");
      orderArr&&orderArr.map((item) => {
        const matchedCard = cards.data.find((card) => card._id === item[1]);
        if (matchedCard) {
          card.push({...matchedCard,"amount":item[0]})
        }
      });
      setCardsArr(card);
    } catch (err) {
      toast.error("Reached, please try again");
    }
  };
 

  useEffect(() => {
    getOrderData();
  }, [show]);

  useEffect(() => {
    const calculateTotalSum = () => {
      let sum = 0;
      if (cardsArr) { 
        cardsArr.forEach((item) => {
          sum += item.price * item.amount;
        });
      }
      setTotalSum(sum);
    };
  
    calculateTotalSum();
  }, [cardsArr]);

  const handelFoPayment=()=>{
    setCardsArr(null)
    navigate(ROUTES.PAYMENT)
  }


  return (
    <Container>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>product</th>
                <th>Amount</th>
                <th>price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cardsArr &&
                cardsArr.map((item) => (
                  <TableOrder
                    key={item._id + Date.now()}
                    imageUrl={item.imageUrl}
                    idCardsArr={item._id}
                    title={item.title}
                    price={item.price}
                    amount={item.amount}
                  />
                ))}
             <tr>
                <td colSpan={3}>Total Sum:</td>
                <td>{totalSum +"$"}</td>
                
              </tr>
            </tbody>
          </Table>
          <Button variant="warning" onClick={handelFoPayment}>Payment</Button>
        </Offcanvas.Body>
      </Offcanvas>
      <div>
        <Button
          variant="warning"
          onClick={handleShow}
          className="buttenCompletionOfAnOrder"
        >
          Completion of an order
        </Button>
      </div>

    </Container>
  );
};

export default CompletionOfAnOrder;
