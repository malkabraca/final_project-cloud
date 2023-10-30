import { Alert, Container, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const RequiredF = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "password",
  "city",
  "street",
  "houseNumber",
];

const RegisterCom = ({ item, inputState, inputsErrorState, onChange }) => {
  const isRequired = RequiredF.includes(item);
  if (item === "biz") return;
  return isRequired ? (
    <Col  xs={12} md={6} >
      <Form.Group as={Col} controlid={item}>
        <FloatingLabel
          controlid="floatingInput"
          label={item + "*"}
          className="mb-3"
        >
          <Form.Control
            name={item}
            id={item}
            type={item}
            className="colinput"
            value={inputState ? inputState[item] : ""}
            onChange={onChange}
            isValid={inputState[item]}
            isInvalid={inputsErrorState && inputsErrorState[item]}
          />
          {inputsErrorState && inputsErrorState[item] && (
            <Form.Control.Feedback tooltip type="invalid">
              {inputsErrorState[item].map((item) => (
                <div key={"{item}-errors" + item}>{item}</div>
              ))}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
    </Col>
  ) : (
    <Col xs={12} md={6}>
      <Form.Group as={Col} controlid={item}>
        <FloatingLabel
          controlid="validationFormik05"
          label={item}
          className="mb-3"
        >
          <Form.Control
            controlid={item}
            name={item}
            id={item}
            fullwidth="true"
            type={item}
            className="colinput"
            value={inputState ? inputState[item] : ""}
            onChange={onChange}
            isValid={inputState[item]}
            isInvalid={inputsErrorState && inputsErrorState[item]}
          />
          {inputsErrorState && inputsErrorState[item] && (
            <Form.Control.Feedback tooltip type="invalid">
              {inputsErrorState[item].map((item) => (
                <div key={"{item}-errors" + item}>{item}</div>
              ))}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
    </Col>
  );
};

export default RegisterCom;
