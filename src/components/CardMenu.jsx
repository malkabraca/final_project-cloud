import { Button, Card, Col, Image } from "react-bootstrap";
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
const CardMenu = ({
  id,
  canEd,
  orderId,
  imageUrl,
  title,
  description,
  price,
  onDelete,
  onEdit,
  canEdit,
  canDelete,
 
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
    <Col xs={12} md={6}>
      <Card className="cardMenu" as={Col}>
        <Image src={imageUrl} roundedCircle className="img_title" />
        <Card.Body className="cardBody">
          <Card.Title className="card_title">{title}</Card.Title>
          <Card.Text className="card_text">{description}</Card.Text>
          <h5 className="card_price">
            {price}
            <BsCurrencyDollar />
          </h5>
          {canDelete && (
            <Button
              variant="warning"
              onClick={handleDeleteBtnClick}
              className="buttenDelEdiMenu"
            >
              <BsTrashFill />
            </Button>
          )}
          {canEdit && (
            <Button
              variant="warning"
              onClick={handleEditBtnClick}
              className="buttenDelEdiMenu"
            >
              <BsPencilFill />
            </Button>
          )}
          {canEd ? (
            <Button
              variant="warning"
              className="buttenAddMenu cardButten"
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
              className="buttenAddMenu cardButten"
              onClick={handleAddToOrder}
            >
              {amount}
            </Button>
          ) : (
            ""
          )}

          {canEd ? (
            <Button
              variant="warning"
              className="buttenAddMenu cardButten"
              onClick={handleMinoc}
            >
              <BsFillCaretDownFill />
            </Button>
          ) : (
            ""
          )}
          {canEd && (
            <Button
              variant="warning"
              onClick={handleAddToOrder}
              className={isFilled ? "alertlink filled" : "alertlink"}
              href="#"
              id="cardButten"
            >
              {isFilled ? "Added to order" : "Add to order"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardMenu;
