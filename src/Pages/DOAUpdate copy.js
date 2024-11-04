import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import englishLabels from "../json/PesdataEnglish.json";
import { NotificationManager } from "react-notifications";
const userData = JSON.parse(localStorage.getItem("userData"));

const DOAUpdate = () => {
  const [labels, setLabels] = useState({});
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("doalogin") &&
      localStorage.getItem("doalogin") == "i89j2y2"
    ) {
    } else {
      navigate("/doalogin");
    }
    if (localStorage.getItem("DOAId")) {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/${localStorage.getItem(
          "DOAId"
        )}`
      );

      setFormData(response.data);
    } catch (error) {
      console.error("Error Fetchig", error);
      NotificationManager.error(`Error Fetchig Data!! Contact Administrator `);
    }
  };

  const [formData, setFormData] = useState({});
  console.log(formData);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  useEffect(() => {
    // Fetch FSPID from local storage and set it in the form data
    // frenchLabels.selectedLanguage = "fr";
    // setLabels(frenchLabels);
    if (userData) {
      console.log("rw34", userData, userData.RoutingID);
      if (userData.RoutingID == 100 || userData.RoutingID == null) {
        englishLabels.selectedLanguage = "en";
        setLabels(englishLabels);
      } else {
        englishLabels.selectedLanguage = "en";
        setLabels(englishLabels);
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        FSPID: userData.FSPID,
      }));
      console.log("userData", userData);
    }
  }, []);

  const updateRecord = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/${localStorage.getItem(
          "DOAId"
        )}/`,
        formData
      );
    } catch (error) {
      console.error("Error updating9", error);
      NotificationManager.error(`Error updating Data!! Contact Administrator `);
    }
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
                    <div className="card-header">Display Records</div>
                    <div className="card-body">
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["10"]}{" "}
                          </label>
                          <input
                            className="form-control"
                            id="d_First"
                            type="text"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                return;
                              }
                            }}
                            //   placeholder="Enter First Name"
                            value={formData.d_First}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["11"]}
                          </label>
                          <input
                            className="form-control"
                            id="d_middle_a"
                            type="text"
                            value={formData.d_middle_a}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row gx-3 middle-2">
                        <div className="col-md-6" style={{ display: "none" }}>
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          ></label>
                          <input
                            className="form-control"
                            id="d_First"
                            type="text"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                return;
                              }
                            }}
                            //   placeholder="Enter First Name"
                            value={formData.d_First}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["12"]}&nbsp;
                          </label>
                          <input
                            className="form-control"
                            id="d_middle_b"
                            type="text"
                            value={formData.d_middle_b}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Last Name
                          </label>
                          <input
                            className="form-control"
                            id="d_First"
                            type="text"
                            //   placeholder="Enter First Name"
                            value={formData.d_First}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Maiden Name
                          </label>
                          <input
                            className="form-control"
                            id="d_middle_b"
                            type="text"
                            value={formData.d_middle_b}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Date of Birth
                          </label>
                          <input
                            className="form-control"
                            id="d_DOB"
                            type="date"
                            value={formData.d_DOB}
                            onChange={handleChange}
                            style={{ display: "hidden" }}
                          />
                        </div>{" "}
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Date of Death
                          </label>
                          <input
                            className="form-control"
                            id="d_DOD"
                            type="date"
                            value={formData.d_DOD}
                            onChange={handleChange}
                          />
                        </div>{" "}
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Age
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_Address"
                            type="text"
                            //   placeholder="Enter Street Address"
                            value={formData.d_Address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            SIN
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_City"
                            type="text"
                            //   placeholder="Enter City/Town"
                            value={formData.d_City}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        {/* Form Group (first name)*/}
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["53"]}&nbsp;
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="e_Salutation"
                            type="text"
                            value={formData.e_Salutation}
                            onChange={handleChange}
                          >
                            <option disabled value="">
                              {labels["54"]}:
                            </option>
                            <option value="Blank"> </option>
                            <option value="Mr"> {labels["151"]}</option>
                            <option value="Mrs">{labels["152"]}</option>
                            <option value="Miss">{labels["153"]}</option>
                            <option value="Ms">{labels["154"]}</option>
                            <option value="Dr">{labels["155"]}</option>
                            <option value="M">{labels["156"]}</option>
                            <option value="Mme">{labels["157"]}</option>
                            <option value="Mlle">{labels["158"]}</option>
                          </select>
                        </div>
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Executor First
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_Postal"
                            type="text"
                            value={formData.d_Postal}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Executor Last
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_Postal"
                            type="text"
                            value={formData.d_Postal}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Executor Middle
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_Postal"
                            type="text"
                            value={formData.d_Postal}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            P.O.#
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_Postal"
                            type="text"
                            value={formData.d_Postal}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Fax Date
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="FaxDate"
                            type="date"
                            value={formData.FaxDate}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Report Date
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="ReportDate"
                            type="date"
                            value={formData.ReportDate}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            100% Match
                          </label>
                          <input
                            className="ms-3"
                            id="d_Postal"
                            type="checkbox"
                            value={formData.d_Postal}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            New Status
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="Status"
                            type="text"
                            value={formData.Status}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Notes
                          </label>
                          <textarea
                            style={{ width: "100%", height: "100%" }}
                          ></textarea>
                        </div>
                      </div>
                      <button
                        onClick={updateRecord}
                        id="newEntry"
                        class="stylish-button my-2"
                      >
                        Update Record
                      </button>
                      <div className="text-center">
                        <p className="text-primary text-decoration-underline">
                          Cancel Changes and return to Search Page
                        </p>
                        <p className="text-primary text-decoration-underline">
                          Return To BLANK Search Page
                        </p>
                      </div>
                      <div className="row gx-3 mb-3">
                        {/* Form Group (last name)*/}

                        <>
                          <div className="col-md-6">
                            <label
                              className="small mb-1"
                              htmlFor="inputFirstName"
                            >
                              Record Created
                            </label>
                            <input
                              className="form-control"
                              id="d_AreaCode"
                              type="text"
                              maxLength="3"
                              value={formData.d_AreaCode}
                              onChange={handleChange}
                              //   placeholder="Enter Area Code"
                              required
                            />
                          </div>
                        </>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Deceased Address
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_AreaCode"
                            type="text"
                            maxLength="3"
                            value={formData.d_AreaCode}
                            onChange={handleChange}
                            //   placeholder="Enter Area Code"
                            required
                          />
                        </div>
                        {/* Form Group (last name)*/}
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="d_Month">
                            Unit
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control"
                            id="d_AreaCode"
                            type="text"
                            maxLength="3"
                            value={formData.d_AreaCode}
                            onChange={handleChange}
                            //   placeholder="Enter Area Code"
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            City
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Prov
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Postal
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Birth City
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Prov
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Country
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Death City
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Prov
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Country
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Health
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Cemetery
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Date
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Executor Address
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Unit
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            City
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Prov
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Postal
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputLastName">
                            Phone
                          </label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputLastName"
                          ></label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputLastName"
                          ></label>
                          <input
                            className="form-control"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-3">
                        {/* Form Group (last name)*/}
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            Relationship
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="e_relationship"
                            value={formData.e_relationship}
                            onChange={handleChange}
                          >
                            <option value="Executor"> {labels["173"]}</option>
                            <option value="Next of Kin">{labels["174"]}</option>
                            <option value="Declared Responsible Person">
                              {labels["175"]}
                            </option>
                            <option value="Legal Representative">
                              {labels["176"]}
                            </option>
                            <option value="Informant">{labels["177"]}</option>
                          </select>
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        {/* Form Group (last name)*/}
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            FSPID
                          </label>
                          <input
                            className="form-control"
                            id="FSPID"
                            type="text"
                            value={formData.FSPID}
                            onChange={handleChange}
                            required
                            //   placeholder="Enter City/Town"
                          />
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
    </>
  );
};

export default DOAUpdate;
