import "./listItem.scss";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useState } from "react";

export default function ListItem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const trailer = "https://vimeo.com/456293878";
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img
        src="https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/6/3/9/0/20936-1-esl-CO/1080x1600.jpg"
        alt=""
      />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <AddIcon />
              <ThumbUpAltIcon />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+16</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium hic rem eveniet error possimus, neque ex doloribus.
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
}
