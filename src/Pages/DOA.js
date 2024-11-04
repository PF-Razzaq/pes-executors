import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { NotificationManager } from "react-notifications";
const userData = JSON.parse(localStorage.getItem("userData"));

const DOA = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  function removeChars(string, theChar) {
    let tstring = "";
    string = "" + string;
    let splitstring = string.split(theChar);
    for (let i = 0; i < splitstring.length; i++) tstring += splitstring[i];
    return tstring;
  }
  function luhn(input) {
    const number = input.toString();
    const digits = number.replace(/\D/g, "").split("").map(Number);
    console.log(digits);
    let sum = 0;
    let isSecond = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (isSecond) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isSecond = !isSecond;
    }
    return sum % 10 === 0;
  }

  function getSin(sinStr) {
    let values = new Array();

    for (let i = 0; i < 3; ++i) {
      values[i] = parseInt(sinStr.charAt(i));
      values[i + 3] = parseInt(sinStr.charAt(i + 3));
      values[i + 6] = parseInt(sinStr.charAt(i + 6));
    }
    return values;
  }

  useEffect(() => {
    if (
      localStorage.getItem("doalogin") &&
      localStorage.getItem("doalogin") == "i89j2y2"
    ) {
    } else {
      navigate("/doalogin");
    }
    localStorage.removeItem("searchFields");
    localStorage.removeItem("searchData");
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <main>
            <div className="container-xl px-4 mt-4">
              <div className="row">
                <div className="col-xl-12">
                  <div
                    className="card mb-4"
                    style={{ backgroundColor: "rgb(242, 246, 252)" }}
                  >
                    <div className="card-body">

                      <h1>Administration Screen </h1>

                      <a
                        href="/doaadminusers"
                        style={{ color: "#0079F4", cursor: "pointer" }}
                      >
                        Admin Users and Locations
                      </a>
                      <br />
                      <a
                        href="/doasearch"
                        style={{ color: "#0079F4", cursor: "pointer" }}
                      >
                        Search for records
                      </a>
                      <br />
                      <a
                        href="/doareports"
                        style={{ color: "#0079F4", cursor: "pointer" }}
                      >
                        Reports
                      </a>
                      <br />
                      <p style={{ color: "#0079F4", cursor: "pointer" }}>
                        Other
                      </p>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Social Insurance Number
                          </label>
                          <input
                            className="form-control"
                            id="d_SIN"
                            type="text"
                            onChange={(e) => {
                              setFormData({
                                d_SIN: removeChars(
                                  removeChars(e.target.value, "-"),
                                  " "
                                ),
                              });
                            }}
                          />
                        </div>
                        <div className="col-md-6">
                          {/* <label
                          style={{ visibility: "hidden" }}
                          className="small mb-1"
                          htmlFor="inputFirstName"
                        >
                          Social Insurance Number
                        </label> */}
                          <br />
                          <button
                            onClick={() => {
                              if (
                                formData["d_SIN"] != "111111111" &&
                                !luhn(getSin(formData["d_SIN"]))
                              ) {
                                NotificationManager.error(
                                  "Please enter a valid SIN number, SIN numbers are 9 digits and match a formula. The SIN as entered does not match as a possible SIN.  If the number is unknown then enter 111 111 111 - only if absolutely necessary!"
                                );
                              } else {
                                NotificationManager.success("SIN is valid!");
                              }
                            }}
                            className="btn btn-primary"
                          >
                            {" "}
                            Check SIN
                          </button>
                        </div>
                      </div>
                      <p
                        onClick={() => {
                          localStorage.removeItem("doalogin");
                          localStorage.removeItem("jpd");
                          navigate("/doalogin");
                        }}
                        style={{ color: "red", cursor: "pointer" }}
                      >
                        Sign Out
                      </p>
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

export default DOA;
