import { Container, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import validateRegisterSchema from "../validation/registerValidation";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import useLoggedIn from "../hooks/useLoggedIn";
import validateLoginSchema from "../validation/loginValidation";
import { toast } from "react-toastify";
import "../css/pages.css";

const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorState, setInputsErrorState] = useState(null);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const joiResponse = validateLoginSchema(inputState);
  const handeleBtnClick = async (ev) => {
    try {
      setInputsErrorState(joiResponse);
      if (joiResponse) {
       
        return;
      }
      const { data } = await axios.post("auth/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      navigate(ROUTES.HOME); 
    } catch (err) {
      toast.error("There is an error,Incorrect email or password"); 
     
    }
    }
    const handleInputChange = (ev) => {
      let newInputState = JSON.parse(JSON.stringify(inputState));
      newInputState[ev.target.id] = ev.target.value;
      setInputState(newInputState);
      const newjoiResponse = validateLoginSchema(newInputState);
      setInputsErrorState(newjoiResponse);
    };
    const shabmit = () => {
      let newInputState = JSON.parse(JSON.stringify(inputState));
      newInputState = {
        email: "",
        password: "",
      };
      setInputState(newInputState);
      const joiResponse = validateLoginSchema(inputState);
      if (!joiResponse) {
        return;
      }
      let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
      Object.keys(newjoiResponse).forEach((index) => {
        newjoiResponse[index] = "";
        inputsErrorState(newjoiResponse);
      });
    };
    const cancel = () => {
      navigate(ROUTES.HOME);
    };
    return (
      <Container>
        <h1 className="title">login</h1>
        <Form>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <Row className="mb-3">
              <Form.Group>
                <FloatingLabel
                  controlid="floatingInput"
                  label={"email" + "*"}
                  className="mb-3"
                >
                  <Form.Control
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    className="colinput"
                    autoComplete="email"
                    value={inputState.email}
                    onChange={handleInputChange}
                    isValid={inputState.email}
                    isInvalid={inputsErrorState && inputsErrorState.email}
                  />
                  {inputsErrorState && inputsErrorState.email && (
                    <Form.Control.Feedback type="invalid">
                      {inputsErrorState.email.map((item) => (
                        <div key={"email-errors" + item}>{item}</div>
                      ))}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlid="password">
                <FloatingLabel
                  controlid="floatingInput"
                  label={"password" + "*"}
                  className="mb-3"
                >
                  {/* <Form.Control type="password" placeholder="password" /> */}
                  <Form.Control
                    required
                    name="password"
                    id="password"
                    type="password"
                    className="colinput"
                    value={inputState.password}
                    onChange={handleInputChange}
                    isValid={inputState.password}
                    isInvalid={inputsErrorState && inputsErrorState.password}
                  />
                  {inputsErrorState && inputsErrorState.password && (
                    <Form.Control.Feedback type="invalid">
                      {inputsErrorState.password.map((item) => (
                        <div key={"password-errors" + item}>{item}</div>
                      ))}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
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
                variant="warning"
                className="colinput"
                onClick={handeleBtnClick}
                disabled={inputsErrorState !== null}
              >
                Login
              </Button>
            </Row>
          </Col>
        </Form>
      </Container>
    );
  };

export default LoginPage;
