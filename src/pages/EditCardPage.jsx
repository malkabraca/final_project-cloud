import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editCardValidation";
import EditCardMenoCom from "../components/EditCardMenoCom";


const EditCardPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [inputsErrorsState, setInputsErrorsState] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/" + id);
        let newInputState = {
          ...data,
        };
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.createdAt;
        delete newInputState.__v;
        setInputState(newInputState);
      } catch (err) {
        toast.error("Error The card does not exist");
      }
    })();
  }, [id]);

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        await axios.put("/cards/" + id, inputState);
        toast.success("Saved successfully");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log(err.response.data);
      toast.error("Error, card cannot be edited");
    }
  };

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.MENU);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditSchema(newInputState);
    setInputsErrorsState(joiResponse);
  };

  if (!inputState) {
    return <Spinner animation="border" role="status"></Spinner>;
  }
  const keys = Object.keys(inputState);
  return (
    <Container>
      <h1 className="title">Edit</h1>
      <Col md={{ span: 6, offset: 3 }} xs={12}>
        <Row className="mb-3">
          {keys.map((item) => (
            <EditCardMenoCom
              key={item}
              item={item}
              inputState={inputState}
              onChange={handleInputChange}
              inputsErrorsState={inputsErrorsState}
            />
          ))}
        </Row>
        <Row className="mb-3">
          <Button
            variant="warning"
            type="submit"
            onClick={handleCancelBtnClick}
            className="colinput"
          >
            CANCEL
          </Button>
          <Button
            variant="warning"
            type="submit"
            onClick={handleSaveBtnClick}
            className="colinput"
          >
            SEVE
          </Button>
        </Row>
      </Col>
    </Container>
  );
};
export default EditCardPage;
