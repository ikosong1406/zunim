import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/client/About.css";
import { FaShop } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
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
          At Zunim, we believe in sustainable living and are passionate about
          enriching your lifestyle.
        </h1>
        <h3>
          Our store offers a broad variety of products, thoughtfully curated to
          bring comfort, style, and sustainability to your home. From chic decor
          items to everyday essentials, we aim to provide high-quality products
          that make life at home more enjoyable and eco-friendly. Explore our
          diverse range of products and join us in creating a more sustainable
          and stylish world.
        </h3>
      </div>

      <div className="homeDiv4">
        <div className="homeDiv41"></div>
        <div className="homeDiv42">
          <h2>About Us</h2>
          <h3>
            Zunim is a lifestyle store based in Port Harcourt, Nigeria. Est
            since 2024. Our customer service is always prepared to support you
            24/7
          </h3>
          <Link className="cta" to="/shop">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="aboutDiv2">
        <h1>Contact Us</h1>
        <div className="homeDiv5">
          <div className="homeDiv51">
            <FaShop className="icon" />
            <p>Address</p>
            <p style={{ textAlign: "center" }}>
              1234 Market Street, Suite 200, San Francisco, CA 94103
            </p>
          </div>
          <div className="homeDiv51">
            <FaPhone className="icon" />
            <p>Contact Us</p>
            <p style={{ textAlign: "center" }}>+234 7012571616</p>
          </div>
          <div className="homeDiv51">
            <MdEmail className="icon" />
            <p>Message Us</p>
            <p style={{ textAlign: "center" }}>Support@zunim.com.ng</p>
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
