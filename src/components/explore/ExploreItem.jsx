import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";


const ExploreItem = ({
  collection: {
    id,
    authorId,
    authorImage,
    expiryDate,
    nftId,
    nftImage,
    title,
    price,
    likes,
  },
}) => {
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const showCountdown = expiryDate && Date.now() <= expiryDate;

  useEffect(() => {
  if (!expiryDate) return;

  function getExpirationDate() {
    const millisLeft = Math.max(0, expiryDate - Date.now());
    const secondsLeft = Math.floor(millisLeft / 1000);

    const displayHours = Math.floor(secondsLeft / 3600);
    const displayMinutes = Math.floor((secondsLeft % 3600) / 60);
    const displaySeconds = secondsLeft % 60;

    setHours(displayHours);
    setMinutes(displayMinutes);
    setSeconds(displaySeconds);
  }

  getExpirationDate();

  const interval = setInterval(getExpirationDate, 1000);

  return () => clearInterval(interval);
}, [expiryDate]);

  return (
    <div key={id}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link to={`/author/${authorId}`}>
            <img className="lazy" src={authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {showCountdown && (
          <div className="de_countdown">
            {hours}h : {minutes}m : {seconds}s
          </div>
        )}

        <div className="nft__item_wrap">
          <Link to={`/item-details/${nftId}`}>
            <img
              src={nftImage}
              className="lazy nft__item_preview"
              alt={title}
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to={`/item-details/${nftId}`}>
            <h4>{title}</h4>
          </Link>
          <div className="nft__item_price">{price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreItem;
