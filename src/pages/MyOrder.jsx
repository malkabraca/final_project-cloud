import { Container, FloatingLabel, Spinner, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MyOrderCom from "../components/MyOrderCom";
import "../css/myOrder.css";
import TableOrder from "../components/TableOrder";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const MyOrder = () => {
  const [order, setOrder] = useState(null);
  const [menuOrder, setMenuOrder] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const [from, setFrom] = useState(false);
 
  
  const navigate = useNavigate();
  const id = jwt_decode(localStorage.token)._id;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("orders/my-allorder-findOne/" + id);
        const menuOrderMyOrder = data.menuOrder;
        setMenuOrder(menuOrderMyOrder);
        let order = {
          ...data,
        };
        delete order._id;
        delete order.user_id;
        delete order.__v;
        delete order.menuOrder;
        setOrder(order);
      } catch (err) {
        toast.error("Arrived, order not found");
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
    return <Spinner animation="border" role="status"></Spinner>;
  }

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };

  const handeleBtnContinued = () => {
    setFrom(!from);
  };

  const keys = Object.keys(order);
  
  return (
    <Container>
      <h1 className="title">My Order</h1>
      {keys.length === 0 ? (
        <h1 className="titelNoOrder">There is no order</h1>
      ) : (
        ""
      )}
      <Col md={{ span: 6, offset: 4 }} xs={12}>
        <Row className="mb-3">
          {keys.map((item) => (
            <MyOrderCom key={item} item={item} order={order} />
          ))}
          {keys.length !== 0 ? (
            <Form.Group as={Col} controlid={"orderStatus"}>
              <Form.Label
                className="textMyOrder"
                controlid="floatingInput"
                label={"order Status"}
              >
                order Status :
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name={"orderStatus"}
                  id={"orderStatus"}
                  type={"orderStatus"}
                  className={`inputMyOrder transparent-background white-text`}
                  value={order.orderStatus ? "Ready Order" : "Working Order"}
                  readOnly
                />
              </Col>
            </Form.Group>
          ) : (
            ""
          )}
          {keys.length !== 0 ? (
            <Col xs={12} md={6}>
              <Form.Group as={Col} controlid={"takeAway"}>
                <Form.Label
                  className="textMyOrder"
                  controlid="floatingInput"
                  label={"take Away"}
                >
                  take Away :
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name={"takeAway"}
                    id={"takeAway"}
                    type={"takeAway"}
                    className={`inputMyOrder transparent-background white-text`}
                    value={order.takeAway ? "Yes ✔️" : "No ❌"}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Col md={{ span: 6, offset: 2 }} xs={12}>
              <Button
                variant="warning"
                onClick={handeleBtnContinued}
                className="colinput"
              >
                <BsArrowRightShort />
                <BsArrowRightShort />
                Dishes Ordered
                <BsArrowLeftShort />
                <BsArrowLeftShort />
              </Button>
            </Col>
            {from ? (  <Table striped bordered hover>
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
                  imageUrl={item.imageUrl}
                  idCardsArr={item._id}
                  title={item.title}
                  price={item.price}
                  amount={item.amount}
                />
              ))}
            <tr>
              <td colSpan={3}>Total Sum:</td>
              <td>{totalSum + "$"}</td>
            </tr>
          </tbody>
        </Table>
           ) : (
            ""
          )}
      </Col>
      <Col>
        <Row className="mb-3">
          <Button
            variant="warning"
            type="submit"
            onClick={handleCancelBtnClick}
            className="colinput"
            style={{ marginTop: "10px" }}
          >
            GO TO HOME PAGE
          </Button>
        </Row>
      </Col>
    </Container>
  );
};
export default MyOrder;
