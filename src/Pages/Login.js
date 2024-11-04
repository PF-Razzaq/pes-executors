import "../PagesCss/Default.css";
import React, { useState } from "react";
import logo from "../assets/img/logo/logo2.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { NotificationManager } from "react-notifications";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login/`,
        formData
      );

      // Extract FSPID and username from the response data

      // Store userData in localStorage
      localStorage.setItem("userData", JSON.stringify(response.data));
      localStorage.setItem("jwt", JSON.stringify(response.data.jwt));

      window.location = "/input";
    } catch (error) {
      console.error("Error occurred while logging in", error);

      if (error.response && error.response.status == 400) {
        NotificationManager.error(`${error.response.data.error}`);
      } else {
        NotificationManager.error(`Login Failed !! Contact Administrator `);
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="loginContainer">
        <div className="row justify-content-center loginCentre">
          <div className="col-lg-5">
            {/* Basic login form*/}
            <div className="card shadow-lg border-0 rounded-lg ">
              <div
                className="card-header justify-content-center"
                style={{ textAlign: "center" }}
              >
                {/* <img
                        src={logo}
                        alt="logo"
                        style={{
                          width: "20rem",
                          height: "15rem",
                          marginTop: "-85px",
                          objectFit: "cover",
                          left: "-10%",
                          position: "relative",
                        }}
                      /> */}
                <h3
                  className="fw-bold"
                  style={{
                    fontSize: "25px",
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                >
                  Login
                </h3>
              </div>

              <div className="card-body">
                {/* Login form*/}
                <form onSubmit={handleSubmit}>
                  {/* Form Group (email address) */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="form-control"
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Form Group (password) */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    {/* <a className="small" href="/PasswordRecovery">
                      Forgot Password?
                    </a> */}
                    <button
                      type="submit"
                      id="loginBtnId"
                      className="btn btn-primary"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <a href="/register">Need an account? Sign up!</a>
                </div>
              </div>
            </div>
          </div>
          {/* <footer className="footer-admin mt-auto footer-light">
            <div className="container-xl px-4">
              <div className="row" style={{ marginTop: "30%" }}>
                <div className="col-md-6 small">
                  Copyright © Executor's Aide Inc. {currentYear}
                </div>
                <div className="col-md-6 text-md-end small">
                  {" "}
                  <a
                    className="col-md-6 text-md-end small"
                    href="/PrivacyStatement"
                  >
                    Privacy Statement
                  </a>
                </div>
              </div>
            </div>
          </footer> */}
        </div>
      </div>
    </>
  );
};

export default Login;
