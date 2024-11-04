import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import ImageContainer from "./ImageContainer";
import axios from "axios"; // Import Axios

const FrenchandQuebecDocuments = () => {
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();
  const handleNavigate = () => {
    // Function to navigate to the PesModifyRecord route
    window.scrollTo(0, 0);
  };
  const handleLogout = async (e) => {
    console.log("logout99");
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/logout/`)
      .then((response) => {
        localStorage.removeItem("userData");
        localStorage.removeItem("jwt");
        navigate("/");
        console.log("logout", response);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <>
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <main>
            <div className="container-xl px-4 mt-4">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card mb-4">
                    <ImageContainer selectedLanguage="en" />
                    <div className="card-body">
                      <div className="container"></div>

                      <h2
                        style={{
                          color: "#0079F4",
                          fontWeight: "bold",
                          marginLeft: "2.5%",
                        }}
                      >
                        French and Quebec Forms
                      </h2>
                      <br></br>

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              French Client Agreement
                            </div>
                          </div>
                          <div className="col-md-6">
                            French Client Agreement and Fax Cover
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              Statement Of Service
                            </div>
                          </div>
                          <div className="col-md-6">
                            French Statement of Service
                          </div>
                        </div>
                      </div>

                      <br></br>

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              French QPP Form
                            </div>
                          </div>
                          <div className="col-md-6">
                            QPP Application for Death and Survivor Benefits.
                          </div>
                        </div>
                      </div>

                      <br></br>

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              English QPP Form
                            </div>
                          </div>
                          <div className="col-md-6">
                            QPP Application for Death and Survivor Benefits.
                          </div>
                        </div>
                      </div>

                      <br></br>

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              French GST/CRA Notification Form
                            </div>
                          </div>
                          <div className="col-md-6">
                            Re-calculates Child and GST Tax Credit entitlement.
                          </div>
                        </div>
                      </div>

                      <br></br>

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              French ISP (OAS/CPP) Notification Form
                            </div>
                          </div>
                          <div className="col-md-6">
                            Notifies Income Security Programs to prevent
                            overpayment.
                          </div>
                        </div>
                      </div>

                      <br></br>

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              French CPP Death Benefit Application
                            </div>
                          </div>
                        </div>
                      </div>

                      <br></br>

                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              French CPP Death Benefit App Instructions
                            </div>
                          </div>
                          <div className="col-md-6"> Print if needed.</div>
                        </div>
                      </div>

                      <br></br>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              French CPP Survivor Benefit Application
                            </div>
                          </div>
                          <div className="col-md-6"></div>
                        </div>
                      </div>

                      <br></br>
                      {/* <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>
                              Blank Client Agreement
                            </div>
                          </div>
                          <div className="col-md-6">French version</div>
                        </div>
                      </div> */}

                      {/* <br></br>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div style={{ color: "#0079F4" }}>Waiver Form</div>
                          </div>
                          <div className="col-md-6">
                            <div>French version</div>
                          </div>
                        </div>
                      </div> */}

                      <hr></hr>

                      {/* <a class="stylish-button" href="/modify">
                        MODIFY ENTRY
                      </a> */}
                      <a
                        style={{ marginLeft: "30%" }}
                        class="stylish-button"
                        href="/input"
                        onClick={handleNavigate}
                      >
                        NEW ENTRY
                      </a>
                      <button
                        style={{ marginLeft: "35%" }}
                        class="stylish-buttonSignout"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </button>
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
    </>
  );
};

export default FrenchandQuebecDocuments;
