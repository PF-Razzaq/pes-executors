import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import webtop from "../assets/img/web_top.jpg";
import englishLabels from "../json/PesdataEnglish.json";
import { NotificationManager } from "react-notifications";
import ImageContainer from "./ImageContainer";
const userData = JSON.parse(localStorage.getItem("userData"));

const ComingSoon = () => {
  const currentYear = new Date().getFullYear();
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
  return (
    <>
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <header className="header">
            <div className="shadow">
              <div
                className="logo"
                style={{
                  paddingTop: "20px",
                  width: "100%",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <a href="index.html" target="_parent">
                  <img src={webtop} alt="toplogo" width="752" height="115" />
                </a>
              </div>
            </div>
          </header>
          {/* Header */}

          {/* Main Container */}
          <div className="main-container">
            {/* Content */}
            <div className="content">
              <h3
                style={{
                  marginLeft: "-5px",
                  marginBottom: "3px",
                  marginTop: "-4px",
                }}
              >
                Being appointed someone’s Executor is viewed as an honour,
                HOWEVER …
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "96px",
                  marginTop: "0px",
                  marginBottom: "15px",
                }}
              >
                <li>
                  it is a significant <em>responsibility</em>
                </li>
                <li>most people are not sure where to start</li>
                <li>
                  <em>time-sensitive tasks</em> are a concern
                </li>
                <li>
                  there are <u>legal and financial implications</u> if mistakes
                  are made
                </li>
              </ul>
              The Executor Help Plan (EHP) addresses these common concerns,
              guiding you through the steps involved in administration and
              settlement of the Estate – also saving you time and money.
              <b>
                Settling an Estate is complex – the Executor Help Plan (EHP)
                information, tools and services will help guide you.
              </b>
              <hr
                size="2"
                color="#093e6b"
                style={{
                  width: "700px",
                  marginLeft: "-1.2cm",
                  marginRight: "0cm",
                  marginBottom: "16px",
                  marginTop: "16px",
                }}
              />
              <h3>
                Go To{" "}
                <a
                  target="_blank"
                  href={process.env.REACT_APP_EXECUTOR_HELP_PLAN}
                >
                  Login
                </a>
              </h3>
              <hr
                size="2"
                color="#093e6b"
                style={{
                  width: "700px",
                  marginLeft: "-1.2cm",
                  marginRight: "0cm",
                  marginBottom: "16px",
                  marginTop: "16px",
                }}
              />
            </div>
            {/* End Content */}

            {/* Footer */}
            <footer>
              <div className="copyright">
                &copy; 2024 Progressive Estate Solutions Inc. All Rights
                Reserved.
              </div>
            </footer>
            {/* End Footer */}

            <div style={{ clear: "both" }}></div>
          </div>
          <footer className="footer-admin mt-auto footer-light">
            {/* <div className="container-xl px-4">
              <div className="row">
                <div className="col-md-6 small">
                  Copyright &copy; Executor's Aide Inc. {currentYear}
                </div>
                <div className="col-md-6 text-md-end small"></div>
              </div>
            </div> */}
          </footer>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
