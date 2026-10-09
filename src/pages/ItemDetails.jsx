import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, Route } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const { id: nftId } = useParams();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
  let cancelled = false;

  async function getItems() {
    setIsLoading(true);
    setItem(null);

    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );

      console.log("Item Details Data:", data);

      if (!cancelled) {
        setItem(data);
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      if (!cancelled) {
        setIsLoading(false);
      }
    }
  }

  getItems();

  return () => {
    cancelled = true;
  };
}, [nftId]);

  // TODO: Instead of "loading", implement a skeleton loading state later on

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <Skeleton height={350} width="100%" />
                ) : (
                  <img
                    src={item?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {isLoading ? (
                      <Skeleton width={250} />
                    ) : (
                      item?.name || item?.title || "Title not found"
                    )}
                  </h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {isLoading ? <Skeleton width={50} /> : item?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {isLoading ? <Skeleton width={50} /> : item?.likes}
                    </div>
                  </div>
                  <p>
                    {isLoading ? <Skeleton count={3} /> : item?.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.ownerId}`}>
                            {isLoading ? (
                              <Skeleton circle width={50} height={50} />
                            ) : (
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                            )}

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.ownerId}`}>
                            {isLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              item?.ownerName
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.creatorId}`}>
                            {isLoading ? (
                              <Skeleton circle width={50} height={50} />
                            ) : (
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.creatorId}`}>
                            {isLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              item?.creatorName
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>
                        {isLoading ? <Skeleton count={1} /> : item?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
