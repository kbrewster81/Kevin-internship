import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ExploreItem from "./ExploreItem";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((res) => {
        setItems(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function handleFilterChange(event) {
    const filter = event.target.value;

    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
        { params: { filter } },
      );

      setItems(response.data);
    } catch (error) {
      console.error("Unable to filter items:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <ExploreItem collection={item} />
        </div>
      ))}

      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};
export default ExploreItems;
