import "../PagesCss/Default.css";
import MaterialTable from "material-table";

import { useNavigate } from "react-router";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { NotificationManager } from "react-notifications";

const PasswordRecovery = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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

    if (formData.email === "") {
      NotificationManager.info("Please enter valid email", "Info");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/password/reset/`,
        formData
      );
      console.log("54", response.status);
      NotificationManager.success(
        "Verification code sent successfully",
        "Success"
      );
      setTimeout(() => {
        navigate(`/verificationcode`);
      }, 4000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        NotificationManager.error("Email not found in Database");
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
                  Enter your email address and we will send you a link to reset
                  your password.
                </div>
                {/* Forgot password form*/}
                <form onSubmit={handleSubmit}>
                  {/* Form Group (email address)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Form Group (submit options)*/}
                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <a className="small" href="/login">
                      Return to login
                    </a>
                    <button type="submit" className="btn btn-primary">
                      Submit
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
    </>
  );
};

export default PasswordRecovery;
