import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { Delete, Edit, Download } from "@mui/icons-material";
import { useNavigate } from "react-router";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import englishLabels from "../json/TrainingEnglish.json";
import frenchLabels from "../json/TrainingFrench.json";
import ImageContainer from "./ImageContainer";
const userData = JSON.parse(localStorage.getItem("userData"));
const Training = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const handleRedirect = () => {
    window.location = "/login";
  };
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
  return (
    <>
      <form>
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <main>
              <div className="container-xl px-4 mt-4">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card mb-4">
                      <ImageContainer selectedLanguage="en" />
                      <div className="card-body">
                        <hr></hr>
                        <h4 style={{ color: "#0079F4", fontWeight: "bold" }}>
                          {" "}
                          What Executor's Aide offers your clients:
                        </h4>
                        <p className="leftTraining">
                          <span style={{ fontWeight: "bold" }}>
                            1. Estate Fraud Protection
                          </span>{" "}
                          – daily electronic notification to key organizations
                          (including Equifax and TransUnion) that a person has
                          died. Intended to prevent Deceased Identity
                          Fraud/Theft.
                        </p>
                        <p className="leftTraining">
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            2. Aftercare Documents{" "}
                          </span>{" "}
                          – can be printed and given to the Executor/Family to
                          assist them in starting the Estate Administration
                          process. Includes cancellation/application for:
                          <br />
                          <span className="leftTraining">
                            {" "}
                            CPP Death and Survivor's benefits{" "}
                          </span>{" "}
                          <br />
                          <span className="leftTraining">
                            {" "}
                            HRDC Income Security Programs (cancel OAS and CPP
                            payments){" "}
                          </span>
                          <br />
                          <span className="leftTraining">
                            {" "}
                            Canada Revenue Agency re-calculation of benefit
                            entitlement form
                          </span>{" "}
                          <br />
                          <span className="leftTraining">
                            {" "}
                            Personalized letters for credit card, insurance, and
                            pension companies
                          </span>
                        </p>{" "}
                        <p className="leftTraining">
                          <span style={{ fontWeight: "bold" }}>
                            3. Client Website
                          </span>{" "}
                          – client access to the Executor's Aide website which
                          includes Executor information, customized forms and
                          letters, articles, and relevant links.
                        </p>
                        <p className="leftTraining">
                          <span style={{ fontWeight: "bold" }}>
                            4. Custom printable Executor's Aide Workbook
                          </span>{" "}
                          – the information, forms, checklists, and letters from
                          the website in printed format customized with your
                          Funeral Home name and personalized for each client
                        </p>
                        <hr></hr>
                        <h4 style={{ color: "#0079F4", fontWeight: "bold" }}>
                          {" "}
                          What Estate Fraud Protection offers your funeral home:
                        </h4>
                        <ul>
                          <li
                            style={{
                              backgroundImage: `url(${process.env.PUBLIC_URL}/clip_image001.gif)`,
                            }}
                          >
                            {" "}
                            service that is proven to be appreciated and valued
                            by clients
                          </li>
                          <li
                            style={{
                              backgroundImage: `url(${process.env.PUBLIC_URL}/clip_image001.gif)`,
                            }}
                          >
                            Enhanced client services with minimal effort and
                            cost
                          </li>
                          <li
                            style={{
                              backgroundImage: `url(${process.env.PUBLIC_URL}/clip_image001.gif)`,
                            }}
                          >
                            Demonstrates to clients, and potential clients, that
                            your services do not stop at the cemetery
                          </li>

                          <li
                            style={{
                              backgroundImage: `url(${process.env.PUBLIC_URL}/clip_image001.gif)`,
                            }}
                          >
                            Differentiation from competitor service offerings
                          </li>
                          <li
                            style={{
                              backgroundImage: `url(${process.env.PUBLIC_URL}/clip_image001.gif)`,
                            }}
                          >
                            Full compliance with Privacy Laws
                          </li>
                          <li
                            style={{
                              backgroundImage: `url(${process.env.PUBLIC_URL}/clip_image001.gif)`,
                            }}
                          >
                            Only offered through participating Funeral Service
                            Providers
                          </li>
                        </ul>
                        <hr></hr>
                        <p className="MsoNormal">
                          For further information please contact us by email at
                          &nbsp;
                          <small>
                            <a href="mailto:bob.howden@progressiveestatesolutions.com">
                              info@ProgressiveEstateSolutions.com
                            </a>
                          </small>
                        </p>
                        <hr></hr>
                        <div className="loginContainer">
                          <div className="row justify-content-center loginCentre">
                            <div className="col-lg-5">
                              {/* Basic login form*/}
                              <div className="card shadow-lg border-0 rounded-lg ">
                                <div
                                  className="card-header justify-content-center"
                                  style={{ textAlign: "center" }}
                                >
                                  <h3
                                    className="fw-bold"
                                    style={{
                                      fontSize: "25px",
                                      marginTop: "5px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    Existing Executor LogIn
                                  </h3>
                                </div>

                                <div className="card-body">
                                  {/* Login form*/}
                                  <form onSubmit={handleSubmit}>
                                    {/* Form Group (email address) */}
                                    <div className="mb-3">
                                      <label
                                        className="small mb-1"
                                        htmlFor="username"
                                      >
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
                                      <label
                                        className="small mb-1"
                                        htmlFor="password"
                                      >
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <footer className="footer-admin mt-auto footer-light">
              <div className="container-xl px-4">
                <div className="row">
                  <div className="col-md-6 small">
                    Copyright © Executor's Aide Inc. {currentYear}
                  </div>
                  <div className="col-md-6 text-md-end small"></div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </form>
    </>
  );
};

export default Training;
