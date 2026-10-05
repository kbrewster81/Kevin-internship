import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  async function getHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );

    setCollections(data);
  }

  useEffect(() => {
    getHotCollections();
  }, []);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {collections.map((collection) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={collection.id}
               > 
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} alt={collection.title} />
                  </Link>
                </div>
            </Slider>

                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft_coll_info">
                  <Link to="/item-details">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
