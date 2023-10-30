import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuLogoutCom from "../components/CardMenuLogut.jsx";
import PopupExample from "../components/popupOrder";
import ROUTES from "../routes/ROUTES";
import "../css/menu.css";
import { BsCardHeading, BsListUl } from "react-icons/bs";

const MenuLogoutPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [listOrCard, setListOrCard] = useState(true);
  const navigate = useNavigate();

  let qparams = useQueryParams();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("err from axios" + "" + err.response.data.msg);
      });
  }, []);

  const handelListOrCard = () => {
    setListOrCard(!listOrCard);
  };

  const handleButtonClick = () => {
    navigate(ROUTES.MENU);
  };
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }

    if (originalCardsArr) {
      let neworiginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        neworiginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  if (!cardsArr) {
    return <Spinner animation="grow" variant="warning" className="spiner" />;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filterItemsByCategory = (category) => {
    return cardsArr.filter((item) => item.category === category);
  };
  const categories = [
    "Main dishes",
    "Salads",
    "drinking",
  ];
  return (
    <Container>
    <Button
        variant="warning"
        className="buttonList"
        onClick={handelListOrCard}
      >
        {listOrCard ? <BsCardHeading /> : <BsListUl />}
      </Button>
      <h1 className="title"> Menu</h1>
      <PopupExample variant="warning" onClick={handleButtonClick} />
      <Nav variant="underline" defaultActiveKey="/home" className="nav_catgory">
        <Nav.Item className="nav_item_catgory">
          <Nav.Link  eventKey="link-1" onClick={() => handleCategoryClick(null)}>All</Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav_item_catgory">
          <Nav.Link
            eventKey="link-3"
            onClick={() => handleCategoryClick("Main dishes")}
          >
            Main Dishes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav_item_catgory">
          <Nav.Link
            eventKey="link-4"
            onClick={() => handleCategoryClick("Salads")}
          >
           Salads
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav_item_catgory">
          <Nav.Link
            eventKey="link-2"
            onClick={() => handleCategoryClick("drinking")}
          >
            drinking
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Row>
        <h2 className="subtitleh2">{selectedCategory}</h2>
        {selectedCategory !== null
          ? cardsArr
              .filter((item) => item.category === selectedCategory)
              .map((item) => (
                <MenuLogoutCom
                  key={item._id + Date.now()}
                  id={item._id}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  listOrCard={listOrCard}
                />
              ))
          : 
          categories.map((category) => (
            <div key={category}>
              <h3 className="subtitleh2">{category}</h3>
              <div className="row">
                {filterItemsByCategory(category).map((item) => (
                  <div className="col-md-6" key={item._id + Date.now()}>
                    <MenuLogoutCom
                      id={item._id}
                      imageUrl={item.imageUrl}
                      imageAlt={item.imageAlt}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                      listOrCard={listOrCard}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}  
      </Row>
    </Container>
  );
};

export default MenuLogoutPage;