import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import RegisterCom from "../components/RegisterCom";
import validateProfileSchema from "../validation/ProfilePageValidation";

const Profail = () => {
  const id = jwt_decode(localStorage.token)._id;

  const [inputState, setInputState] = useState(null);
  const [inputsErrorState, setinputsErrorState] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/auth/users/" + id);
        let newInputState = {
          ...data,
        };
       delete newInputState.recommendations;
        delete newInputState.isAdmin;
        delete newInputState.isBusiness;
        delete newInputState.password;
        delete newInputState._id;
        delete newInputState.createdAt;
        delete newInputState.zip;
        delete newInputState.__v;
        setInputState(newInputState);
      } catch (err) {
        toast.error("OK, Anna, try again later");
      }
    })();
  }, [id]);
  const handeleBtnClick = async (ev) => {
    try {
      const joiResponse = validateProfileSchema(inputState);
      setinputsErrorState(joiResponse);
      if (!joiResponse){
        await axios.put("/auth/users/" + id, inputState);
        toast.success("The change was successfully saved");
        navigate(ROUTES.LOGIN);
      }
    } catch (err) {
      toast.error("There is an error," + "" + err.response.data.message);
    }
  };
  const handleChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateProfileSchema(newInputState);
    setinputsErrorState(joiResponse);
  };
  if (!inputState) {
    return <Spinner animation="grow" variant="warning" />;
  }
  const cancel = () => {
    navigate(ROUTES.HOME);
  };
  const keys = Object.keys(inputState);
  return (
    <Container>
      <h1 className="title">profail</h1>
      <Form>
        <Col md={{ span: 6, offset: 3 }} xs={12}>
          <Row className="mb-3">
            {keys.map((item) => (
              <RegisterCom
                key={item}
                item={item}
                inputState={inputState}
                onChange={handleChange}
                inputsErrorState={inputsErrorState}
              />
            ))}
          </Row>
        </Col>
      </Form>
      <Row className="mb-3">
        <Button
          className="colinput"
          variant="warning"
          onClick={handeleBtnClick}
        >
          save
        </Button>
      </Row>
      <Row className="mb-3">
        <Button
          variant="warning"
          type="submit"
          onClick={cancel}
          className="colinput"
        >
          cancel
        </Button>
      </Row>
    </Container>
  );
};

export default Profail;
