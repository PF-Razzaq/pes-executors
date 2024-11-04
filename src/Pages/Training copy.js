import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { Delete, Edit, Download } from "@mui/icons-material";
import { useNavigate } from "react-router";
import englishLabels from "../json/TrainingEnglish.json";
import frenchLabels from "../json/TrainingFrench.json";
import ImageContainer from "./ImageContainer";
const userData = JSON.parse(localStorage.getItem("userData"));
const Training2 = () => {
  const [labels, setLabels] = useState({});
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      if (userData.RoutingID == 100 || userData.RoutingID == null) {
        englishLabels.selectedLanguage = "en";
        setLabels(englishLabels);
      } else {
        englishLabels.selectedLanguage = "en";
        setLabels(englishLabels);
      }
    }
  }, []);

  const handleEdit = (event, rowData) => {
    console.log(rowData);
    navigate(`/modifyRecord/${rowData.eventID}`);
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
                          Estate Fraud Protection — 2 Component
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
                        </p>{" "}
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
                            Differentiation from competitor service offerings
                          </li>
                          <li
                            style={{
                              backgroundImage: `url(${process.env.PUBLIC_URL}/clip_image001.gif)`,
                            }}
                          >
                            Full compliance with Privacy Laws
                          </li>
                        </ul>
                        <hr></hr>
                        <h5 style={{ color: "#0079F4", fontWeight: "bold" }}>
                          {" "}
                          Training Resources
                        </h5>
                        <p className="MsoNormal">
                          <a
                            style={{ fontSize: ".9em", paddingLeft: "0" }}
                            target="_blank"
                            title="General Information Overview"
                            href="Web.pdf"
                          >
                            Overview Presentation
                          </a>{" "}
                          - downloadable Powerpoint presentation{" "}
                        </p>
                        <p className="MsoNormal">
                          <a
                            style={{ fontSize: ".9em", paddingLeft: "0" }}
                            target="_blank"
                            title="General Information Overview"
                            href="SalesSheet.pdf"
                          >
                            Sales Sheet
                          </a>{" "}
                          - printable PDF for quick reference
                        </p>
                        <p className="MsoNormal">
                          <a
                            style={{ fontSize: ".9em", paddingLeft: "0" }}
                            target="_blank"
                            title="General Information Overview"
                            href="FAQ.pdf"
                          >
                            FAQ Sheet
                          </a>{" "}
                          - the most common questions that people ask about the
                          service
                        </p>
                        <p className="MsoNormal">
                          <a
                            style={{ fontSize: ".9em", paddingLeft: "0" }}
                            target="_blank"
                            title="General Information Overview"
                            href="WebsiteTips.pdf"
                          >
                            Website Tips
                          </a>{" "}
                          - not sure how to add a shortcut to your desktop? or
                          print from IE? This quick reference will help
                        </p>
                        <p className="MsoNormal">
                          <a
                            style={{ fontSize: ".9em", paddingLeft: "0" }}
                            target="_blank"
                            title="General Information Overview"
                            href="8Reasons.pdf"
                          >
                            The top 8 Reasons
                          </a>
                          &nbsp;you should care about Deceased Identity Fraud
                        </p>
                        <p className="MsoNormal">
                          <a
                            style={{ fontSize: ".9em", paddingLeft: "0" }}
                            target="_blank"
                            title="General Information Overview"
                            href="8Reasons.pdf"
                          >
                            Articles on Deceased Identity Theft
                          </a>
                        </p>
                        <hr></hr>
                        <p className="MsoNormal">
                          For further support - or to update users/passwords -
                          please contact Executor's Aide at (905) 822-7675 or by
                          email at SCIsupport@ProgressiveEstateSolutions.com
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
      </form>
    </>
  );
};

export default Training2;
