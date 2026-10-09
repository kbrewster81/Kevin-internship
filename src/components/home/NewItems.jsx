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

const NewItems = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  console.log(data);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((res) => setItems(res.data));
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {items.map((collection) => (
                <div key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img src={collection.nftImage} alt={collection.title} />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      {isLoading ? (
                        <Skeleton height={10} width="100%" />
                      ) : (
                        <img
                          src={collection.nftImage}
                          className="img-fluid img-rounded mb-sm-30 nft-image"
                          alt=""
                        />
                      )}
                      ;
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${collection.id}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                    </div>
                    <div className="nft__item_price">
                      {collection.price} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{collection.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {items.map((collection) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={collection.id}
            >
              <div className="nft__item">
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="de_countdown">5h 30m 32s</div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <div className="nft__item_price">3.08 ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>69</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
