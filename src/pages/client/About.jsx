import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
        <h1>Welcome to Our Store</h1>
        <h3>Your one-stop shop for all your lifestyle needs.</h3>
      </div>

      <div className="homeDiv4">
        <div className="homeDiv41"></div>
        <div className="homeDiv42">
          <h2>About Us</h2>
          <h3>Thousands of lifestyle products waiting for you</h3>
          <Link className="cta" to="/shop">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="aboutDiv2">
        <h1>Contact Us</h1>
        <div className="homeDiv5">
          <div className="homeDiv51">
            <FaShippingFast className="icon" />
            <p>Address</p>
            <p style={{ textAlign: "center" }}>
              1234 Market Street, Suite 200, San Francisco, CA 94103
            </p>
          </div>
          <div className="homeDiv51">
            <RiSecurePaymentFill className="icon" />
            <p>Contact Us</p>
            <p style={{ textAlign: "center" }}>
              For any inquiries, please email us at support@store.com
            </p>
          </div>
          <div className="homeDiv51">
            <FaPhone className="icon" />
            <p>Message Us</p>
            <p style={{ textAlign: "center" }}>
              Send us a message and we'll get back to you as soon as possible.
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
              <button className="flat-button">Submit</button>
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
            <Marker position={[4.804597, 6.932498]}>
              <Popup>Our Office Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default About;
