import { Button, Container } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const ButtonCreatCom = ({ canCreate }) => {
  const navigate = useNavigate();

  const btnCraet = () => {
    navigate(ROUTES.CREATE);
  };
  return (
    <Container>
      {canCreate ? (
        <Button className="buttonCreatCom" variant="warning" onClick={btnCraet}>
          +
        </Button>
      ) : (
        " "
      )}
    </Container>
  );
};

export default ButtonCreatCom;
