import "../PagesCss/Default.css";
import React, { Profiler, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { NotificationManager } from "react-notifications";
import ImageContainer from "./ImageContainer";
const LandingPageOld = (props) => {
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
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <ImageContainer selectedLanguage="en" />
          <main>
            <header
              className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10"
              id="dashMobile2"
            >
              <div className="container-xl px-4">
                <div className="page-header-content pt-4">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto mt-4">
                      <h1 className="page-header-title" />
                      <div className="page-header-icon">
                        <h1 className="page-header-title">
                          Executor's Aide&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp;
                        </h1>
                      </div>
                      <br></br>
                      <div
                        className="page-header-subtitle"
                        style={{ color: "white" }}
                      >
                        Being appointed someone’s Executor is viewed as an
                        honour; however ...
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="page-header-subtitle">
                    <p> 1) It is a significant responsibility </p>
                    <p> 2) Most people are not sure where to start </p>
                    <p> 3) Time-sensitive tasks are a concern </p>
                    <p>
                      {" "}
                      4) there are legal and financial implications if mistakes
                      are made{" "}
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <>
              <div className="container-xl px-4 mt-n10">
                <div className="row">
                  <div className="solid">
                    <div className="card mb-4">
                      <div className="card-header" id="leftspace">
                        Introduction to Executor's Aide
                      </div>
                      <div className="card-body" id="landingPageCardBody">
                        Since 2004 Executor's Aide has provided innovative
                        estate-related services for the Deathcare and Financial
                        services industries. These services allow businesses to
                        focus on their core competencies, while offering
                        enhanced services to their clients in a cost effective
                        manner.
                        <br />
                        <br />
                        Our Executor's Aide Program provides practical
                        information and a comprehensive set of tools (including
                        forms, checklists, letters, & worksheets) to assist the
                        Executor with the administrative tasks that must be done
                        when Administering an Estate. With the Estate
                        information you provide, our forms and letters will
                        print with relevant personal details – ensuring that all
                        written correspondence is consistent, and saving you
                        time.
                        <br />
                        <br />
                        Our information sheets and checklists will make sure
                        that you don’t miss out on refunds or benefit
                        entitlements – which will benefit the Estate and reduce
                        your personal liability.
                        <br /> <br />
                        Our Estate Fraud Protection Service ensures that key
                        organizations receive timely notification of the death,
                        protecting against Deceased Identity Fraud/Theft. Since
                        2004 we have assisted over 1 million people with this
                        service!
                        <br /> <br />
                        Our Legal Service Plan can ensure that you get accurate
                        Legal Advice from a Lawyer that is licensed in your
                        Province or State.
                        <br></br>
                        <hr />
                        <h4
                          className="warningIcon"
                          style={{
                            background: " url(/warns.png) no-repeat left",
                          }}
                        >
                          Funeral/Financial Service Provider Information
                        </h4>
                        If you are a Funeral Service Provider that would like
                        more information on offering our services to your
                        clients please see our FSP Information Page
                        <br />
                        For further information, or to arrange a demonstration,
                        please contact us at:
                        info@ProgressiveEstateSolutions.com
                        <br />
                        <hr />
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
            </>
          </main>
          <footer className="footer-admin mt-auto footer-light footerMobile">
            <div className="container-xl px-4">
              <div className="row">
                <div className="col-md-6 small">
                  Executor's Aide Inc. {currentYear}
                </div>
                <a
                  className="col-md-6 text-md-end small"
                  onClick={() => {
                    navigate("/PrivacyStatement");
                  }}
                >
                  {/* Privacy Statement */}
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default LandingPageOld;
