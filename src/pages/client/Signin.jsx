import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { storeUserToken } from "../Api/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/client/Signin.css";
import bottle from "../../images/waterbottle-removebg-preview.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ThreeCircles } from "react-loader-spinner";
import Colors from "../../components/Colors";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <ThreeCircles
            height="80"
            width="80"
            color={Colors.pink}
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="signinMain">
          <ToastContainer />
          <div className="signinDiv1">
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                paddingTop: "20px",
              }}
            >
              <div className="logoDiv">
                <h1>Zunim.</h1>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={bottle} alt="bottle" />
            </div>
          </div>
          <div className="signinDiv2">
            <h1>Sign in</h1>
            <h3>
              Dont have an account ?{" "}
              <Link
                style={{ color: "blueviolet", textDecoration: "none" }}
                to="/signup"
              >
                Sign up
              </Link>
            </h3>
            <div className="signinDiv21">
              <div className="password">
                <input
                  type="text"
                  value={email}
                  placeholder="Your username or email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={handlePasswordToggle}
                  style={{ color: Colors.dark }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <h4>Forgot Password ?</h4>
              <button
                className="loginBtn"
                // onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <div className="loadingAnimation"></div>
                ) : (
                  <h3>SIGN IN</h3>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
