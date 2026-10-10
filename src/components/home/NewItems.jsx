import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewItem = ({
  collection: { authorImage, expiryDate, nftId, nftImage, title, price, likes },
}) => {
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [item, setItem] = useState(null);
  const showCountdown = expiryDate && Date.now() <= expiryDate;

  function getExpirationDate() {
    const millisLeft = expiryDate - Date.now();
    const secondsLeft = millisLeft / 1000;
    const minsLeft = secondsLeft / 60;
    const hoursLeft = minsLeft / 60;

    const displayHours = Math.floor(hoursLeft);
    const displayMinutes = Math.floor(minsLeft) % 60;
    const displaySeconds = Math.floor(secondsLeft) % 60;

    setHours(displayHours);
    setMinutes(displayMinutes);
    setSeconds(displaySeconds);
  }

  useEffect(() => {
    if (showCountdown) {
      const interval = setInterval(getExpirationDate, 1000);
      return () => clearInterval(interval);
    }
  }, [expiryDate]);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((res) => {
        setItem(res.data);
      });
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div key={nftId}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link to="/author">
            <img className="lazy" src={authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {showCountdown && (
          <div className="de_countdown">
            {hours} : {minutes} : {seconds}
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

export default NewItem;
