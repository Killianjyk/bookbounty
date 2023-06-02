import React from "react";
import Slider from "react-slick";
import { useGetTopFavoriteBooksQuery } from "./app/booksApiSlice";


export default function Carousel() {

  const { data: topFavoriteBooks, isLoading: topFavoritesLoad } = useGetTopFavoriteBooksQuery();

  if (topFavoritesLoad) return <div className="txt">Loading...</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[0].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[1].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[2].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[3].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[4].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[5].image}></img>
      </div>
            <div>
        <img className="mx-auto" src={topFavoriteBooks[6].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[7].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[8].image}></img>
      </div>
      <div>
        <img className="mx-auto" src={topFavoriteBooks[9].image}></img>
      </div>
    </Slider>
  );
}
