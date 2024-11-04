import "../PagesCss/Default.css";
import React, { useState } from "react";
import logo from "../assets/img/logo/logo2.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { NotificationManager } from "react-notifications";
const DOALogin = () => {
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
    formData.password = formData.password
      .replace(/[^\w\s]/gi, "")
      .replace(/\s/g, "")
      .toLowerCase();

    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/adminlogin/`,
        { password: formData.password }
      );
      console.log("login22", response.data);
      localStorage.setItem("doalogin", "i89j2y2");
      localStorage.setItem("jpd", response.data.token);

	  localStorage.setItem("jwt", response.data.token);	  
	  

      navigate("/doa");
    } catch (error) {
      console.error("Error ", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        NotificationManager.error(`${error.response.data.message}`);
      } else {
        NotificationManager.error(`Login Failed!! Contact Administrator `);
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="loginContainer" style={{ marginTop: "50px" }}>
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
            </div>
          </div>
          <footer className="footer-admin mt-auto footer-light">
            <div className="container-xl px-4">
              <div className="row" style={{ marginTop: "30%" }}>
                <div className="col-md-6 small">
                  Copyright © Executor's Aide Inc. {currentYear}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DOALogin;
