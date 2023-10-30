import { Col, FloatingLabel, Form } from "react-bootstrap";
const itemCategory = ["category"];

const EditCardMenoCom = ({ item, inputState, onChange, inputsErrorState }) => {
  if (item === "bizNumber") return;
  const category = itemCategory.includes(item);
  return category ? (
    <Col xs={12} md={6}>
      <Form.Select
        name={item}
        id={item}
        aria-label="Default select example"
        className="colinput input_category"
        onChange={onChange}
        value={inputState ? inputState[item] : ""}
      >
        <option>category</option>
        <option>Main dishes</option>
        <option>Salads</option>
        <option >drinking</option>
      </Form.Select>
    </Col>
  ) : (
    <Col xs={12} md={6}>
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

export default EditCardMenoCom;
