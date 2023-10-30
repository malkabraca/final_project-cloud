import { Container, FloatingLabel, Nav, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import TableOrder from "../components/TableOrder";

const OrderDetails = () => {
  const [menuOrder, setMenuOrder] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("orders/" + id);
        const menuOrderMyOrder = data.menuOrder;
        setMenuOrder(menuOrderMyOrder);
        let order = {
          ...data,
        };
        delete order._id;
        delete order.user_id;
        delete order.__v;
        delete order.OrderMenu;
        setOrder(order);
      } catch (err) {
        toast.error("Error, order not found");
      }
    })();
  }, [id]);
  useEffect(() => {
    const getOrderData = async () => {
      if (!menuOrder) {
        return;
      }
      let card = [];
      try {
        const cards = await axios.get("/cards");
        menuOrder &&
          menuOrder.map((item) => {
            const matchedCard = cards.data.find((card) => card._id === item[1]);
            if (matchedCard) {
              card.push({ ...matchedCard, amount: item[0] });
            }
          });
        setCardsArr(card);
      } catch (err) {
        toast.error("Server Reached Please try again");
      }
    };
    getOrderData();
  }, [menuOrder]);
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

  if (!order) {
    return <Spinner animation="grow" variant="warning" className="spiner" />;
  }

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.CRM);
  };
  const keys = Object.keys(order);


  const onChangeOrderStatusTrue = async()=>{
    try{
      await axios.patch("/orders/orderStatus/crmt/" + id);
    }
    catch(err){
      toast.error("Error, order status not changed");
    }
  }
  const onChangeOrderStatusFalse = async()=>{
    try{
      await axios.patch("/orders/orderStatus/crmf/" + id);
    }
    catch(err){
      toast.error("Error, order status not changed");
    }
  }
  return (
    <Container>
      <h1 className="title" >Order Details</h1>
      {keys.length === 0 ? (
        <h1 className="titelNoOrder">There is no order</h1>
      ) : (
        ""
      )}
      <Form.Group controlid={"orderStatus"}>
        <Col md={{ span: 12, offset: 5 }} xs={12}>
          <Form.Label
            className="textMyOrder"
            controlid="floatingInput"
            label={"order Status"}
          >
            order Status :
          </Form.Label>
          <Nav variant="underline" defaultActiveKey={order.orderStatus ? "link-1" : "link-2"}>
            <Nav.Item className="nav_item_catgory">
              <Nav.Link eventKey="link-1" onClick={onChangeOrderStatusTrue}> is ready</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav_item_catgory">
              <Nav.Link eventKey="link-2" onClick={onChangeOrderStatusFalse}>is not ready</Nav.Link>
            </Nav.Item>
          </Nav>
        
        </Col>
      </Form.Group>
      <Table striped bordered hover style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>img</th>
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
                idCardsArr={item._id}
                imageUrl={item.imageUrl}
                alt={item.alt}
                title={item.title}
                price={item.price}
                amount={item.amount}
              />
            ))}
          <tr>
            <td colSpan={4}>Total Sum:</td>
            <td>{totalSum + "$"}</td>
          </tr>
        </tbody>
      </Table>
      <Col>
        <Row className="mb-3">
          <Button
            variant="warning"
            type="submit"
            onClick={handleCancelBtnClick}
            className="colinput"
            style={{ marginTop: "10px" }}
          >
            GO TO CRM
          </Button>
        </Row>
      </Col>
    </Container>
  );
};
export default OrderDetails;
