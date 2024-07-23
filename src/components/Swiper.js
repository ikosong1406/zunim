import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/client/Swiper.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import bottle from "../images/waterbottle-removebg-preview.png";
import slippers from "../images/slippers.png";
import blender from "../images/blender.png";
import ringlight from "../images/ringlight.png";
import Colors from "./Colors";

export default function Swipers() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="homeDiv1">
            <div className="homeDiv11">
              <h1>
                Refresh Your <span style={{ color: Colors.ash }}>Day</span>,
                Every <span style={{ color: Colors.ash }}>Day</span>
              </h1>
              <h3>
                Stay hydrated and energized with our premium water bottles,
                designed for a healthy and active lifestyle.
              </h3>
              <Link className="cta" to="/shop">
                Shopping Now
              </Link>
            </div>
            <div className="homeDiv12">
              <img src={bottle} alt="bottle" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="homeDiv1">
            <div className="homeDiv11">
              <h1>
                Step Up Your <span style={{ color: Colors.ash }}>Style</span>
              </h1>
              <h3>
                Comfortable and stylish, our footwear collection is perfect for
                any occasion.
              </h3>
              <Link className="cta" to="/shop">
                Shopping Now
              </Link>
            </div>
            <div className="homeDiv12">
              <img src={slippers} alt="footwear" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="homeDiv1">
            <div className="homeDiv11">
              <h1>
                Blend Your Way to{" "}
                <span style={{ color: Colors.ash }}>Wellness</span>
              </h1>
              <h3>
                Power up your smoothie game with our high-performance blenders,
                designed for ease and efficiency.
              </h3>
              <Link className="cta" to="/shop">
                Shopping Now
              </Link>
            </div>
            <div className="homeDiv12">
              <img src={blender} alt="blender" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="homeDiv1">
            <div className="homeDiv11">
              <h1>
                Shine Bright with Our{" "}
                <span style={{ color: Colors.ash }}>Ring Lights</span>
              </h1>
              <h3>
                Elevate your photography and videography with our premium ring
                lights, perfect for any setting.
              </h3>
              <Link className="cta" to="/shop">
                Shopping Now
              </Link>
            </div>
            <div className="homeDiv12">
              <img src={ringlight} alt="ringlight" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
