import { Container, Row } from "react-bootstrap";
import ROUTES from "../routes/ROUTES";
import CardFood from "../components/carsd.jsx";
import { useNavigate } from "react-router-dom";
import PopupExample from "../components/popupOrder";
import PopupBookTable from "../components/popupBookTable";
import Slider from "../components/Slider";
import "../css/home_page.css";

const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(ROUTES.MENU);
  };
  return (
    <Container>
      <h1 className="title">Welcome</h1>
      <Container className="phome">
        <p>
          Located in a charming corner of the city, the Italian chef
          restaurant-The Senior Restaurant is a culinary gem that immerses
          diners in the essence of Italy. The fragrant smells of fresh bread and
          aromatic sauces permeate the air, beckoning hungry patrons. With a
          menu inspired by traditional Italian recipes, each dish is a symphony
          of authentic flavors and premium ingredients.
        </p>
        <p>
          Skilled chefs, trained in the art of Italian cuisine, infuse each
          plate with passion and precision, guaranteeing an exceptional dining
          experience. From classic pasta dishes to indulgent tiramisu, this
          restaurant captures the true spirit of Italian gastronomy, leaving
          guests wanting more.
        </p>

        <div className="divbuttonehome">
          <PopupBookTable variant="warning" />

          <PopupExample variant="warning" onClick={handleButtonClick} />
        </div>
      </Container>
      <CardFood />
      <h3 className="subtitle">Our recommenders</h3>
      <Slider />
    </Container>
  );
};
export default HomePage;
