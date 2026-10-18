import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AuthorImage from "../images/author_thumbnail.jpg";


const Author = () => {
  const { id: authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setAuthor(null);
    setError("");

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
        { params: { author: authorId } },
      )
      .then((res) => {
        if (!cancelled) setAuthor(res.data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load author.");
      });

    return () => {
      cancelled = true;
    };
  }, [authorId]);

  if (error) return <p>{error}</p>;
  if (!author) return <p>Loading author...</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div data-aos="fade-up"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="Author profile" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers + (isFollowing ? 1 : 0)} followers
                        <button
                          className="btn-main"
                          onClick={() => setIsFollowing(!isFollowing)}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
