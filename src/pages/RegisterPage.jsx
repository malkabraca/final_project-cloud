import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import RegisterCom from "../components/RegisterCom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import validateRegisterSchema from "../validation/registerValidation";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import "../css/pages.css";

const RegisterPage = () => {
  const [inputState, setInputState] = useState({
    firstName: "",
    lastName: "",
    imageUrl: "",
    imageAlt: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: "",
    biz: false,
  });
  const [inputsErrorState, setinputsErrorState] = useState([]);
  const navigate = useNavigate();
  const handeleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setinputsErrorState(joiResponse);

      if (joiResponse) {
        return;
      }
      if (inputState.imageUrl === "") {
        inputState.imageUrl =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      }
      if (inputState.imageAlt === "") {
        inputState.imageAlt = "man/Woman";
      }
      await axios.post("/auth/users", {
        firstName: inputState.firstName,
        lastName: inputState.lastName,
        phone: inputState.phone,
        email: inputState.email,
        password: inputState.password,
        imageUrl: inputState.imageUrl,
        imageAlt: inputState.imageAlt,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        zipCode: inputState.zipCode,
        biz: inputState.biz,
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error("Invalid user information");
    }
  };
  const cancel = () => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateRegisterSchema(newInputState);
    setinputsErrorState(joiResponse);
  };
  const handleBizChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState["biz"] = ev.target.checked;
    setInputState(newInputState);
  };

  const keys = Object.keys(inputState);

  return (
    <Container>
      <h1 className="title">register</h1>
      <Form>
      <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Row className="mb-3">
            {keys.map((item) => (
              <RegisterCom
                key={item}
                item={item}
                inputState={inputState}
                onChange={handleInputChange}
                inputsErrorState={inputsErrorState}
              />
            ))}
          </Row>
          <Row className="mb-3">
            <Button
              variant="warning"
              type="submit"
              onClick={cancel}
              className="colinput"
            >
              CANCEL
            </Button>
          </Row>
          <Row className="mb-3">
            <Button
              className="colinput"
              variant="warning"
              onClick={handeleBtnClick}
            >
              Sign Up
            </Button>
          </Row>
        </Col>
      </Form>
    </Container>
  );
};

export default RegisterPage;
