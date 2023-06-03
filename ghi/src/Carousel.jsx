import React from "react";
import Slider from "react-slick";
import { useGetTopFavoriteBooksQuery } from "./app/booksApiSlice";
import { Link } from "react-router-dom";


export default function Carousel() {

  const { data: topFavoriteBooks, isLoading: topFavoritesLoad } = useGetTopFavoriteBooksQuery();

  if (topFavoritesLoad) return <div className="txt">Loading...</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
  };

  let num = 1;

  return (
    <div className="w-80 mx-auto" >
    <Slider {...settings}>
        {topFavoriteBooks?.map((book) => (
          <div className="">
            <Link to={book.work_id} key={book.id}>
                <div>{num++}/10</div>
                <img className="mx-auto" src={book.image} alt={book.title} />
            </Link>
          </div>
        ))}
    </Slider>
    </div>
  );
}
