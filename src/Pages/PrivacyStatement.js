import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { Delete, Edit, Download } from "@mui/icons-material";
import { useNavigate } from "react-router";
import englishLabels from "../json/PrivacyStatementEnglish.json";
import frenchLabels from "../json/PrivacyStatementFrench.json";
import ImageContainer from "./ImageContainer";
const userData = JSON.parse(localStorage.getItem("userData"));
const PrivacyStatement = () => {
  const [labels, setLabels] = useState({});
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      console.log("rw34", userData, userData.RoutingID);
      if (userData.RoutingID == 100 || userData.RoutingID == null) {
        setLabels(englishLabels);
      } else {
        setLabels(frenchLabels);
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
                        <div style={{ color: "#0079F4" }}>
                          {" "}
                          <h2 style={{ color: "#0079F4", fontWeight: "bold" }}>
                            {" "}
                            {labels["1"]}
                          </h2>
                        </div>
                        <hr></hr>
                        <p>{labels["3"]}</p>
                        <p style={{ color: "#0079F4" }}>{labels["4"]}</p>
                        <p>{labels["5"]}</p>
                        <p>{labels["6"]}</p>

                        <p style={{ color: "#0079F4" }}>{labels["7"]}</p>
                        <p>{labels["8"]}</p>
                        <p style={{ color: "#0079F4" }}>{labels["9"]}</p>
                        <p>{labels["10"]}</p>
                        <p style={{ color: "#0079F4" }}>{labels["11"]}</p>
                        <p>{labels["12"]}</p>
                        <p style={{ color: "#0079F4" }}>{labels["13"]}</p>
                        <p>{labels["14"]}</p>
                        <p style={{ color: "#0079F4" }}>{labels["15"]}</p>
                        <p>{labels["16"]}</p>
                        <p style={{ color: "#0079F4" }}>{labels["17"]}</p>
                        <p>{labels["18"]}</p>
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

export default PrivacyStatement;
