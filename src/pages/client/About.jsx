import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/client/About.css";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

const About = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  // const userCollectionRef = collection(db, "contactdata");

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   addDoc(userCollectionRef, {
  //     name: name,
  //     email: email,
  //     subject: subject,
  //     message: message,
  //   })
  //     .then(() => {
  //       alert("form submitted Successfully");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  const mapRef = useRef(null);

  return (
    <div className="aboutMain">
      <div className="aboutDiv1">
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          officiis doloremque architecto, delectus dicta doloribus?
        </h1>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
          nesciunt!
        </h3>
      </div>

      <div className="homeDiv4">
        <div className="homeDiv41"></div>
        <div className="homeDiv42">
          <h2>About Us</h2>
          <h3>thousand of lifestyle products waiting for you</h3>
          <Link className="cta">Shop Now</Link>
        </div>
      </div>

      <div className="aboutDiv2">
        <h1>Contact Us</h1>
        <div className="homeDiv5">
          <div className="homeDiv51">
            <FaShippingFast className="icon" />
            <p>Address</p>
            <p style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              illum?
            </p>
          </div>
          <div className="homeDiv51">
            <RiSecurePaymentFill className="icon" />
            <p>Contact Us </p>
            <p style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              illum?
            </p>
          </div>
          <div className="homeDiv51">
            <FaPhone className="icon" />
            <p>Message Us</p>
            <p style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              illum?
            </p>
          </div>
        </div>

        <div className="aboutDiv21">
          <div className="contactDiv11">
            <div className="contactDiv111">
              <input
                placeholder="Name"
                type="text"
                name="name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
              <input
                placeholder="Email"
                type="email"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="contactDiv112">
              <input
                placeholder="Subject"
                type="text"
                name="subject"
                onChange={(event) => {
                  setSubject(event.target.value);
                }}
                required
              />
            </div>
            <div className="contactDiv113">
              <textarea
                placeholder="Message"
                name="message"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                required
              ></textarea>
            </div>
            <div className="contactDiv114">
              <button className="flat-button"> Submit </button>
            </div>
          </div>

          <MapContainer
            center={[4.804597, 6.932498]}
            zoom={13}
            ref={mapRef}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Additional map layers or components can be added here */}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default About;
