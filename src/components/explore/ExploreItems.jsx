import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ExploreItems = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error("Unable to fetch items:", error);
      });
  }, []);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "price_low_to_high") {
      return parseFloat(a.price) - parseFloat(b.price);
    }

    if (sortBy === "price_high_to_low") {
      return parseFloat(b.price) - parseFloat(a.price);
    }

    if (sortBy === "likes_high_to_low") {
      return Number(b.likes) - Number(a.likes);
    }

    return 0;
  });

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setVisibleCount(8);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {sortedItems.slice(0, visibleCount).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item" data-aos="fade-up">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">5h 30m 32s</div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a
                      href="https://www.twitter.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount((prev) => prev + 8)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
