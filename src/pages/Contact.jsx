import Recommendation from "../components/popupRecom";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Col, Row, Form, Container,Button } from "react-bootstrap";
import { useState } from "react";
import validateContactSchema from "../validation/contact";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import"../css/contact.css"

const Contact = () => {
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [inputsErrorState, setInputsErrorState] = useState(null);
  const joiResponse = validateContactSchema(inputState);
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const handeleBtnClick = () => {
    setInputState
   ({ name :"",
     email : "",
     phone : "",
     message :""});
     toast.success("the form has been sent successfully we will be in touch...");
   };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const newjoiResponse = validateContactSchema(newInputState);
    setInputsErrorState(newjoiResponse);
  };
  return (
    <Container className="center-content ">
      <h1 className="title">Contact</h1>
      <Col md={{ span: 6, offset: 3 }} xs={12}>
        <Form className="contact_page align-items-center justify-content-center ">
          <Row className="g-2">
            <Col md>
              <Form.Group className="mb-3">
                <Form.Label className="label_input">Name:</Form.Label>
                <Form.Control
                  type="name"
                  id="name"
                  name="name"
                  value={inputState.name}
                  placeholder="name"
                  className="colinput"
                  onChange={handleInputChange}
                  isInvalid={inputsErrorState && inputsErrorState.name}
                />
                {inputsErrorState && inputsErrorState.name && (
                  <Form.Control.Feedback type="invalid">
                    {inputsErrorState.name.map((item) => (
                      <div key={"name-errors" + item}>{item}</div>
                    ))}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className="mb-3">
                <Form.Label className="label_input">Phone:</Form.Label>
                <Form.Control
                  type="phone"
                  id="phone"
                  name="phone"
                  value={inputState.phone}
                  placeholder="phone"
                  className="colinput"
                  onChange={handleInputChange}
                  isInvalid={inputsErrorState && inputsErrorState.phone}
                />
                {inputsErrorState && inputsErrorState.phone && (
                  <Form.Control.Feedback type="invalid">
                    {inputsErrorState.phone.map((item) => (
                      <div key={"phone-errors" + item}>{item}</div>
                    ))}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="label_input">Email:</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={inputState.email}
              placeholder="email"
              className="colinput"
              onChange={handleInputChange}
              isInvalid={inputsErrorState && inputsErrorState.email}
            />
            {inputsErrorState && inputsErrorState.email && (
              <Form.Control.Feedback type="invalid">
                {inputsErrorState.email.map((item) => (
                  <div key={"email-errors" + item}>{item}</div>
                ))}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label_input">
              content of the message:
            </Form.Label>
            <Form.Control
              id="message"
              name="message"
              value={inputState.message}
              as="textarea"
              rows={3}
              placeholder="content of the message"
              className="colinput"
              onChange={handleInputChange}
              isInvalid={inputsErrorState && inputsErrorState.message}
            />
            {inputsErrorState && inputsErrorState.message && (
              <Form.Control.Feedback type="invalid">
                {inputsErrorState.message.map((item) => (
                  <div key={"message-errors" + item}>{item}</div>
                ))}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
        <Button
          variant="warning"
          onClick={handeleBtnClick}
          className="colinput"
          disabled={inputsErrorState !== null}
        >
          Send
        </Button>
      </Col>
    <Col md={{ span: 12, offset: 0 }} xs={12}>
    {isLoggedIn ? ( <div className="div_icon_contact">
          <BsChevronDoubleDown className="icon_contact" />
          <BsChevronDoubleDown className="icon_contact" />
          <BsChevronDoubleDown className="icon_contact" />
        </div>   ) : (
        ""
      )} 
      </Col>
         {isLoggedIn ? (
         <Recommendation />
      ) : (
        ""
      )} 
     
    </Container>
  );
};
export default Contact;
