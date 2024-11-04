import "../PagesCss/Default.css";
import MaterialTable from "material-table";

import { useNavigate } from "react-router";

import axios from "axios";
import React, { useState, useEffect } from "react";

// import "./Nail.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const VerificationCode = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otpCode: 0,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: Number(value),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.otpCode === 0) {
      NotificationManager.info("Please enter valid code!!!", "Info");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/password/check_code/`,
        formData
      );

      localStorage.setItem("verificationCode", formData.otpCode);
      NotificationManager.success(
        "Verification Code Match successfully",
        "Success"
      );
      setTimeout(() => {
        navigate(`/NewPassword`);
      }, 4000);
    } catch (error) {
      console.error("Error occured while fetching theme", error);
      if (error.response && error.response.status === 409) {
        NotificationManager.error("Code mismatched");
      } else {
        NotificationManager.error("Error sending code.Contact Administrator");
      }
    }
  };
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="loginContainer">
        <div className="row justify-content-center loginCentre">
          <div className="col-lg-5">
            {/* Basic forgot password form*/}
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header justify-content-center">
                <h3 className="fw-light my-4">Password Recovery</h3>
              </div>
              <div className="card-body">
                <div className="small mb-3 text-muted">
                  Enter code we have just sent to your email.
                </div>
                {/* Forgot password form*/}
                <form onSubmit={handleSubmit}>
                  {/* Form Group (email address)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Verification Code
                    </label>
                    <input
                      className="form-control"
                      id="otpCode"
                      type="number"
                      placeholder="Enter Verification Code"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Form Group (submit options)*/}
                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <a className="small" href="/login">
                      Return to login
                    </a>
                    <button type="submit" className="btn btn-primary">
                      Reset Password
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
        </div>
      </div>
      {/* <div id="layoutAuthentication_footer">
        <footer className="footer-admin mt-auto footer-dark">
          <div className="container-xl px-4">
            <div className="row">
              <div className="col-md-6 small">
                Copyright © Roof Pal {currentYear}
              </div>
              <div className="col-md-6 text-md-end small"></div>
            </div>
          </div>
        </footer>
      </div> */}
    </>
  );
};

export default VerificationCode;
