import React, { useState, useEffect, useRef } from "react";
import "./hero-slide.scss";
import { useNavigate } from "react-router-dom";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Button, { OutlineButton } from "../../components/button/Button";
import Modal, { ModalContent } from "../../components/modal/Modal";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(response.results.slice(0, 4));
      } catch (error) {
        console.log("err", error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((movieItem, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSliderItem item={movieItem} className={`${isActive ? "active" : ""}`} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((movieItem, index) => (
        <TrailerModal item={movieItem} key={index}></TrailerModal>
      ))}
    </div>
  );
};

const HeroSliderItem = (props) => {
  let navigate = useNavigate();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.posters_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);
    
    if(videos.results.length >0){
      const videoSrc='https://www.youtube.com/embed/'+ videos.results[0].key;
      modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
    }else{
      modal.querySelector('.modal__content').innerHTML="no Trailer found"
    }

    modal.classList.toggle('active')
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate("/movie/" + item.id)}>Watch Now</Button>
            <OutlineButton onClick={() => setModalActive()}>Watch Trailer</OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;
  const iframRef = useRef(null);

  const onClose = () => iframRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframRef} width="100%" height="500px" title="Trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
