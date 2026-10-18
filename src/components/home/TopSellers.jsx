import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
<<<<<<< HEAD
import AOS from "aos";
=======
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


>>>>>>> b961c486b83888b6161169ea252f9c9a1610072f
const TopSellers = () => {

  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((res) => {
        setSellers(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div data-aos="fade-up"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller, index) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img className="lazy" src={seller.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>  
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
