import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "react-bootstrap/Image";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Slider = () => {
  const [inputState, setInputState] = useState([]);
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const allUser = await axios.get("/auth/users");
      setInputState(allUser.data);
    } catch (err) {
      toast.error("Server error please try again");
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1500}
    >
      {inputState
        .filter((item) => item.recommendations !== "")
        .map((item) => (
          <div key={item._id + Date.now()}>
            <div className="div_recommenders">
              <div className="recommenders"></div>
              <Image
                className="imge_recommenders"
                src={item.imageUrl}
                roundedCircle
                alt={item.imageAlt}
              />
              <div className="icon_recommenders">
                <BsFillPinAngleFill />
              </div>
              <h5 className="text_recommenders">{item.recommendations}</h5>
            </div>
          </div>
        ))}
    </Carousel>
  );
};
export default Slider;

