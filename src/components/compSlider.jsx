import { BsFillPinAngleFill } from "react-icons/bs"
import Image from "react-bootstrap/Image";

const CompSlider=({img,alt,recommendations})=>{
return(
<div>
<div className="div_recommenders">
    <div className="recommenders"></div>
    <Image
      className="imge_recommenders"
      src={img}
      roundedCircle
      alt={alt}
    />
    <div className="icon_recommenders">
      <BsFillPinAngleFill />
    </div>
    <h5 className="text_recommenders">
     {recommendations}
    </h5>
    </div>
    </div>
)
}
export default CompSlider