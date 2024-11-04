import "../PagesCss/Default.css";
import React, { useState } from "react";
import favicon from "../assets/img/favicon.png";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const Register = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    companyName: "",
    address: "",
    postCode: "",
    nameofSupplier: "",
    supplieremail1: "",
    supplieremail2: "",
    supplieremail3: "",
    password: "",
    confirmpassword: "",
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

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/Register`,
        formData
      );
      NotificationManager.success("User Created successfully", "Success");
      setTimeout(() => {
        navigate(`/login`);
      }, 5000);
    } catch (error) {
      console.error("Error occured while fetching theme", error);
      if (error.response && error.response.status == 409) {
        NotificationManager.error(
          "User is already registered with this email. Provide valid email address to continue",
          "Error"
        );
      }
    }
  };
  const currentYear = new Date().getFullYear();
  return (
    <>
      {/* <ToastContainer /> */}

      <style>
        {`
          body {
            background-color: #0061f2;
          }
        `}
      </style>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container-xl px-4">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  {/* Basic registration form*/}
                  <div
                    className="card shadow-lg border-0 rounded-lg mt-5"
                    id="RegisterMob2"
                  >
                    <div
                      className="card-header justify-content-center"
                      id="RegisterMob"
                    >
                      <h3 className="fw-light my-4">Create Account</h3>
                    </div>
                    <div className="card-body">
                      {/* Registration form*/}
                      <form onSubmit={handleSubmit}>
                        {/* Form Row*/}
                        <div className="row gx-3">
                          <div className="col-md-6">
                            {/* Form Group (first name)*/}
                            {/* Form Group (first name)*/}
                            <div className="mb-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                First Name
                              </label>
                              <input
                                required
                                className="form-control"
                                id="firstname"
                                type="text"
                                placeholder="Enter first name"
                                value={formData.firstname}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            {/* Form Group (last name)*/}
                            <div className="mb-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Last Name
                              </label>
                              <input
                                required
                                className="form-control"
                                id="lastname"
                                type="text"
                                placeholder="Enter last name"
                                value={formData.lastname}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Form Group (email address)            */}
                        <div className="mb-3">
                          <label
                            className="small mb-1"
                            htmlFor="inputCompanyName"
                          >
                            Company Name
                          </label>
                          <input
                            required
                            className="form-control"
                            id="companyName"
                            type="text"
                            aria-describedby="companyHelp"
                            placeholder="Enter company name"
                            value={formData.companyName}
                            onChange={handleChange}
                          />
                        </div>
                        {/* Form Group (email address)            */}
                        <div className="mb-3">
                          <label className="small mb-1" htmlFor="address">
                            Address
                          </label>
                          <input
                            required
                            className="form-control"
                            id="address"
                            type="text"
                            aria-describedby="address"
                            placeholder="Enter addess"
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </div>
                        {/* Form Group (email address)            */}
                        <div className="mb-3">
                          <label className="small mb-1" htmlFor="postcode">
                            Post Code
                          </label>
                          <input
                            required
                            className="form-control"
                            id="postCode"
                            type="text"
                            aria-describedby="postcode"
                            placeholder="Enter post code"
                            value={formData.postCode}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="row gx-3">
                          <div className="col-md-12">
                            {/* Names of local suppliers */}
                            <div className="mb-3">
                              <label
                                className="small mb-1"
                                htmlFor="localsuppliers"
                              >
                                Names of local suppliers
                              </label>
                              <textarea
                                className="form-control"
                                id="nameofSupplier"
                                rows={4}
                                placeholder="Enter names of local suppliers"
                                value={formData.nameofSupplier}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            {/* Supplier emails */}
                            <div className="mb-3">
                              <div className="row gx-3">
                                <div className="col-md-4">
                                  <label
                                    className="small mb-1"
                                    htmlFor="supplieremail1"
                                  >
                                    Supplier Email 1
                                  </label>
                                  <input
                                    className="form-control"
                                    id="supplieremail1"
                                    type="email"
                                    placeholder="Enter supplier email 1"
                                    value={formData.supplieremail1}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    className="small mb-1"
                                    htmlFor="supplieremail2"
                                  >
                                    Supplier Email 2
                                  </label>
                                  <input
                                    className="form-control"
                                    id="supplieremail2"
                                    type="email"
                                    placeholder="Enter supplier email 2"
                                    value={formData.supplieremail2}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    className="small mb-1"
                                    htmlFor="supplieremail3"
                                  >
                                    Supplier Email 3
                                  </label>
                                  <input
                                    className="form-control"
                                    id="supplieremail3"
                                    type="email"
                                    placeholder="Enter supplier email 3"
                                    value={formData.supplieremail3}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Group (email address)            */}
                        <div className="mb-3">
                          <label
                            className="small mb-1"
                            htmlFor="inputEmailAddress"
                          >
                            Your Email
                          </label>
                          <input
                            required
                            className="form-control"
                            id="email"
                            type="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        {/* Form Row    */}
                        <div className="row gx-3">
                          <div className="col-md-6">
                            {/* Form Group (password)*/}
                            <div className="mb-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputPassword"
                              >
                                Password
                              </label>
                              <input
                                required
                                className="form-control"
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            {/* Form Group (confirm password)*/}
                            <div className="mb-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputConfirmPassword"
                              >
                                Confirm Password
                              </label>
                              <input
                                required
                                className="form-control"
                                id="confirmpassword"
                                type="password"
                                placeholder="Confirm password"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Form Group (create account submit)*/}
                        {/* <a className="btn btn-primary btn-block" href="">
                      Create Account
                    </a> */}
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Create Account
                        </button>
                      </form>
                    </div>
                    <div className="card-footer text-center">
                      <div className="small">
                        <a href="/login">Have an account? Go to login</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
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
        </div>
      </div>
    </>
  );
};

export default Register;
