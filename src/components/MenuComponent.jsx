import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import ImagePopup from "./ImagePopup";
import {
  BsCurrencyDollar,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsPencilFill,
  BsTrashFill,
} from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../css/media.css";

const MenuComponent = ({
  id,
  orderId,
  imageUrl,
  title,
  description,
  price,
  imageAlt,
  onDelete,
  onEdit,
  canEdit,
  canDelete,
  canEd,
  listOrCard,
}) => {
  const [amount, setaAmount] = useState(1);
  const [isFilled, setIsFilled] = useState(false);


  useEffect(() => {
    handleDes();
  }, []);

  const handleDes = async () => {
    if (canDelete) {
      return;
    }
    try {
      const orderdis = await axios.get("/orders/" + orderId);
      const foundItem = orderdis.data.menuOrder.find((item) => item[1] === id);
      if (foundItem) {
        const foundItemId = foundItem[0];
        setaAmount(foundItemId);
        setIsFilled(!isFilled);
      }
    } catch (err) {
      toast.error("Error, no reservation exists");
    }
  };

  const handleAddToOrder = async () => {
    setIsFilled(!isFilled);
    try {
      await axios.patch("/orders/menuOrder/" + orderId, {
        card_id: id,
        amount: amount,
      });
    } catch (err) {
      toast.error("Error, item not added to order");
    }
  };
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };

  const handlePlos = () => {
    setaAmount((amount) => amount + 1);
  };
  const handleMinoc = () => {
    if (amount === 1) {
      return;
    }
    setaAmount((amount) => amount - 1);
  };
 

  return (
    <Container>
    <Col xs={12} md={12}>
       <Form.Group as={Col}>
          <ListGroup className="alert">
            <div className="product-list">
              <div key={id} className="product-item">
                <ImagePopup imageUrl={imageUrl} alt={imageAlt} />
                <div className="product-details">
                  <h3>{title}</h3>
                  <h6>{description}</h6>
                  <h5>
                    {price}
                    <BsCurrencyDollar />
                  </h5>
                </div>
              </div>
            </div>
            <div className="buttons-wrappera">
              <div className="buttons-wrapper">
                {canEd ? (
                  <Button
                    variant="warning"
                    className="buttenAddMenu"
                    onClick={handlePlos}
                  >
                    <BsFillCaretUpFill />
                  </Button>
                ) : (
                  ""
                )}

                {canEd ? (
                  <Button
                    variant="warning"
                    className="buttenAddMenu"
                    /* onClick={handleAddToOrder} */
                  >
                    {amount}
                  </Button>
                ) : (
                  ""
                )}

                {canEd ? (
                  <Button
                    variant="warning"
                    className="buttenAddMenu"
                    onClick={handleMinoc}
                  >
                    <BsFillCaretDownFill />
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <div className="buttons-wrapper">
                {canEd ? (
                  <Button
                    variant="warning"
                    onClick={handleAddToOrder}
                    className={isFilled ? "alertlink filled" : "alertlink"}
                    /*  href="#" */
                  >
                    {isFilled ? "Added to order" : "Add to order"}
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <Row>
                {canDelete ? (
                  <Button
                    variant="warning"
                    className="buttenDelEdiMenu"
                    onClick={handleDeleteBtnClick}
                  >
                    <BsTrashFill />
                  </Button>
                ) : (
                  ""
                )}
                {canEdit ? (
                  <Button
                    variant="warning"
                    className="buttenDelEdiMenu"
                    onClick={handleEditBtnClick}
                  >
                    <BsPencilFill />
                  </Button>
                ) : (
                  ""
                )}
              </Row>
            </div>
          </ListGroup>
        </Form.Group>
    </Col>
    </Container>
  );
};
export default MenuComponent;
