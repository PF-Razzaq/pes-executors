import "../PagesCss/Default.css";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router";
import ImageContainer from "./ImageContainer";
import axios from "axios"; // Import Axios
const userData = JSON.parse(localStorage.getItem("userData"));

const PesPrint = () => {
  const openPDF = async (endPoint, id, fileName) => {
    setVisitedColors([...visitedColors, id]);
    // window.open(
    //   `${process.env.REACT_APP_BACKEND_URL}/api/${endPoint}?EventID=${
    //     JSON.parse(localStorage.getItem("eventID")).eventID
    //   }&User=${JSON.parse(localStorage.getItem("userData")).username}`,
    //   "_blank"
    // );

    return;
    if (isLoading === false) {
      setIsLoading(true);
      setVisitedColors([...visitedColors, id]);
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/${endPoint}/`,
            {
              ...JSON.parse(localStorage.getItem("eventID")),
              ...JSON.parse(localStorage.getItem("userData")),
            } || {},

            {
              responseType: "blob",
            }
          )
          .then((response) => {
            setIsLoading(false);
            const blob = new Blob([response.data], {
              type: "application/pdf",
            });
            const objectUrl = window.URL.createObjectURL(blob);
            // var link = document.createElement("a");
            // link.href = objectUrl;
            // link.download = fileName;
            // link.click();
            // setTimeout(function () {
            //   window.URL.revokeObjectURL(objectUrl);
            // }, 100);
            const newTab = window.open(objectUrl, "_blank");
            newTab.onunload = () => {
              window.URL.revokeObjectURL(objectUrl);
            };
            // NotificationManager.success(
            //   "Report opened in new tab and downloaded as well.Please disable  popup blockers if facing problem in opening report in new tab.",
            //   ""
            // );
          })
          .catch((error) => {
            setIsLoading(false);
            reject(error);
          });
      });
    }
  };
  const [visitedColors, setVisitedColors] = useState([]);
  const currentYear = new Date().getFullYear();
  const defaultMaterialTheme = createTheme();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    // Function to navigate to the PesModifyRecord route
    window.scrollTo(0, 0);
    navigate("/input");
  };
  const handleNavigateModify = () => {
    // Function to navigate to the PesModifyRecord route
    window.scrollTo(0, 0);
    navigate("/modify");
  };
  const handleLogout = async (e) => {
    console.log("logout99");
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/logout/`)
      .then((response) => {
        setIsLoading(false);
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
                      {/* <h3 style={{marginLeft: "2.5%", color: "red"}}>
                              {" "}
                              Please note that our primary Internet Fax Service at 877-511-1917 is experiencing outages.  
                              Please use our alternate number 866-391-3003 in the interim.
                    </h3> */}
                      <div>
                        {" "}
                        {/* <div className="col-md-6" style={{ color: "red" }}>
                          Should you wish to confirm data entry please use the
                          following (internal use only!).
                        </div> */}
                        <div className="container">
                          <h6>
                            {" "}
                            Based on the information provided the following
                            documents have been pre-populated for your
                            convenience.
                          </h6>
                          <div className="row">
                            <div className="col-md-5">
                              <a
                                className="printLinks"
                                href={`${
                                  process.env.REACT_APP_BACKEND_URL
                                }/api/ClientData?EventID=${
                                  JSON.parse(localStorage.getItem("eventID"))
                                    .eventID
                                }&User=${
                                  JSON.parse(localStorage.getItem("userData"))
                                    .username
                                }`}
                                target="_blank"
                                onClick={() => {
                                  openPDF("ClientData", 1, "ClientData.pdf");
                                }}
                                style={{
                                  color:
                                    visitedColors.indexOf(1) === -1
                                      ? "#0079F4"
                                      : "lightblue",
                                  cursor: isLoading ? "wait" : "pointer",
                                }}
                              >
                                Client Data Sheet
                              </a>
                            </div>
                            <div
                              className="col-md-7"
                              style={{
                                marginBottom: "7px",
                                color: "red",
                              }}
                            >
                              Internal use: for locations that review data-entry
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <h2
                        style={{
                          fontWeight: "bold",
                          marginLeft: "2.2%",
                        }}
                      >
                        Required Printing:
                      </h2>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/EAClientAgreement?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "EAClientAgreement",
                                  2,
                                  "ClientAgreement2024.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(2) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Client Agreement & Fax Cover Sheet
                            </a>
                          </div>
                          <div className="col-md-7">
                            Print and have the family sign. Fax to PES.
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <h2
                        style={{
                          fontWeight: "bold",
                          marginLeft: "2.2%",
                        }}
                      >
                        Optional Printing - NOTE: We provide the forms ONLY
                      </h2>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/OASNotification?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "OASNotification",
                                  3,
                                  "OASNotification.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(3) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              OAS and CPP Notification Form
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            To stop payment of current benefits/avoid
                            overpayment. (formerly ISP Form).
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/CRAForm?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF("CRAForm", 4, "CRA.pdf");
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(4) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              GST/CRA Notification Form
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            Re-calculates Child and GST Credit entitlement.
                            Should be mailed.
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/CPPSource2024?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF("CPPSource2024", 5, "cpp.pdf");
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(5) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              CPP Death Benefit Application
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            Editable Spouse and Applicant fields.
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/CPPSurvivor?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF("CPPSurvivor", 6, "Survivor.pdf");
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(6) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              CPP Survivor Benefit Application
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            Informant IS the spouse. Editable Spouse and
                            Applicant fields.
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/CPPSurvivor2a?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF("CPPSurvivor2a", 7, "Survivor2.pdf");
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(7) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              CPP Survivor Benefit Application
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            Informant IS NOT the spouse. Editable Spouse and
                            Applicant fields.
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href="/CPP Survivor information sheet.pdf"
                              target="_blank"
                              onClick={() => {
                                setVisitedColors([...visitedColors, 8]);
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(8) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              CPP Survivor information sheet
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            Information sheet – how to apply
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/CRArep?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF("CRArep", 9, "CRArep.pdf");
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(9) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Appoint CRA Rep where Deceased had No Will
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            If the Deceased had No Will you need to Assign a Rep
                            for CRA
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/OASapplication?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "OASapplication",
                                  77,
                                  "OASapplication.pdf"
                                );
                              }}
                              style={{
                                marginBottom: "7px",
                                color:
                                  visitedColors.indexOf(77) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Application for OAS Allowance
                            </a>
                          </div>
                          <div
                            className="col-md-7"
                            style={{ fontSize: "14px" }}
                          >
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              NEW
                            </span>{" "}
                            Applicants aged 60-64 with low income
                          </div>
                        </div>
                      </div>
                      <div className="container mt-2">
                        <div className="row">
                          <div className="col-md-5">
                            <a
                              className="printLinks"
                              href="/AllowanceInfo.pdf"
                              target="_blank"
                              onClick={() => {
                                setVisitedColors([...visitedColors, 78]);
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(78) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              OAS Allowance Info Sheet
                            </a>
                          </div>
                          <div
                            className="col-md-7"
                            style={{ fontSize: "14px" }}
                          >
                            Eligibility and how to apply
                          </div>
                        </div>
                      </div>
                      <div className="container mt-2">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/CPPStudent?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF("CPPStudent", 10, "CPPStudent.pdf");
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(10) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              CPP Student Benefit Application - Part 1
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              target="_blank"
                              href="/CPPStudent2.pdf"
                              onClick={() => {
                                setVisitedColors([...visitedColors, 11]);
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(11) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              CPP Student Benefit Application - Part 2
                            </a>
                          </div>
                        </div>
                      </div>
                      <br />
                      {userData.RoutingID == 104 && (
                        <>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-5 printspace">
                                <a
                                  href={`${
                                    process.env.REACT_APP_BACKEND_URL
                                  }/api/BCCIS?EventID=${
                                    JSON.parse(localStorage.getItem("eventID"))
                                      .eventID
                                  }&User=${
                                    JSON.parse(localStorage.getItem("userData"))
                                      .username
                                  }`}
                                  target="_blank"
                                  onClick={() => {
                                    openPDF(
                                      "BCCIS",
                                      12,
                                      "BC Client Information Sheet.pdf"
                                    );
                                  }}
                                  style={{
                                    color:
                                      visitedColors.indexOf(12) === -1
                                        ? "#0079F4"
                                        : "lightblue",
                                    cursor: isLoading ? "wait" : "pointer",
                                  }}
                                >
                                  BC Client Information Sheet
                                </a>
                              </div>
                              <div className="col-md-7 printspacesec">
                                Standard format
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {userData.RoutingID == 200 && (
                        <>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-5 printspace">
                                <a
                                  target="_blank"
                                  href={`${
                                    process.env.REACT_APP_BACKEND_URL
                                  }/api/PODSource?EventID=${
                                    JSON.parse(localStorage.getItem("eventID"))
                                      .eventID
                                  }&User=${
                                    JSON.parse(localStorage.getItem("userData"))
                                      .username
                                  }`}
                                  onClick={() => {
                                    openPDF("PODSource", 13, "POD.pdf");
                                  }}
                                  style={{
                                    color:
                                      visitedColors.indexOf(13) === -1
                                        ? "#0079F4"
                                        : "lightblue",
                                    cursor: isLoading ? "wait" : "pointer",
                                  }}
                                >
                                  Proof of Death Certificates
                                </a>
                              </div>
                              <div className="col-md-7 printspacesec">
                                Standard format
                              </div>
                            </div>
                          </div>

                          <div className="container">
                            <div className="row">
                              <div className="col-md-5 printspace">
                                <a
                                  target="_blank"
                                  href={`${
                                    process.env.REACT_APP_BACKEND_URL
                                  }/api/PrivacyPOD?EventID=${
                                    JSON.parse(localStorage.getItem("eventID"))
                                      .eventID
                                  }&User=${
                                    JSON.parse(localStorage.getItem("userData"))
                                      .username
                                  }`}
                                  onClick={() => {
                                    openPDF("PrivacyPOD", 14, "POD.pdf");
                                  }}
                                  style={{
                                    color:
                                      visitedColors.indexOf(14) === -1
                                        ? "#0079F4"
                                        : "lightblue",
                                    cursor: isLoading ? "wait" : "pointer",
                                  }}
                                >
                                  Privacy POD Certificates
                                </a>
                              </div>
                              <div className="col-md-7 printspacesec">
                                Proof of Death without SIN and other details
                              </div>
                            </div>
                          </div>

                          <div className="container">
                            <div className="row">
                              <div className="col-md-5 printspace">
                                <a
                                  target="_blank"
                                  href={`${
                                    process.env.REACT_APP_BACKEND_URL
                                  }/api/FDSDsource?EventID=${
                                    JSON.parse(localStorage.getItem("eventID"))
                                      .eventID
                                  }&User=${
                                    JSON.parse(localStorage.getItem("userData"))
                                      .username
                                  }`}
                                  onClick={() => {
                                    openPDF("FDSDsource", 15, "POD.pdf");
                                  }}
                                  style={{
                                    color:
                                      visitedColors.indexOf(15) === -1
                                        ? "#0079F4"
                                        : "lightblue",
                                    cursor: isLoading ? "wait" : "pointer",
                                  }}
                                >
                                  Funeral Director Statement of Death
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="container">
                            <div className="row">
                              <div className="col-md-5 printspace">
                                <a
                                  target="_blank"
                                  href={`${
                                    process.env.REACT_APP_BACKEND_URL
                                  }/api/PrivacyFDSD?EventID=${
                                    JSON.parse(localStorage.getItem("eventID"))
                                      .eventID
                                  }&User=${
                                    JSON.parse(localStorage.getItem("userData"))
                                      .username
                                  }`}
                                  onClick={() => {
                                    openPDF("PrivacyFDSD", 16, "POD.pdf");
                                  }}
                                  style={{
                                    color:
                                      visitedColors.indexOf(16) === -1
                                        ? "#0079F4"
                                        : "lightblue",
                                    cursor: isLoading ? "wait" : "pointer",
                                  }}
                                >
                                  Privacy FDSD Certificates
                                </a>
                              </div>
                              <div className="col-md-7 printspacesec">
                                <div>FDSS without SIN and other details</div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              target="_blank"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/FDSDnoSIN?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              onClick={() => {
                                openPDF("FDSDnoSIN", 17, "POD.pdf");
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(17) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              FDSD Certificate - no SIN
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            <div>Detailed FDSD without SIN</div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/CommonLawUnion?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "CommonLawUnion",
                                  18,
                                  "CommonLawUnion.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(18) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Common Law Union Declaration
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            <div>
                              Used in the case of a common law union for CPP and
                              OAS Benefits
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/DeclarationLegalMarriage?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "DeclarationLegalMarriage",
                                  19,
                                  "LegalMarriageDeclaration.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(19) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Legal Marriage Declaration
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            <div>
                              Used when proof of Marriage required for CPP and
                              OAS Benefits
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/fspStatementofServices?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "fspStatementofServices",
                                  20,
                                  "SOS.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(20) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Statement of Services
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            <div>
                              Print on Letterhead and give to the family
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/ClientLetters?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "ClientLetters",
                                  21,
                                  "ClientLetterz.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(21) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Client Letters
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/EAWebsiteLetter?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "EAWebsiteLetter",
                                  22,
                                  "EAWebsiteLetter.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(22) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Website Letter
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/EAWorkbook2024b?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "EAWorkbook2024b",
                                  23,
                                  "EAWorkbook2024.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(23) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              Executors Aide Workbook
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/EAAftercareTrackingSheet?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF(
                                  "EAAftercareTrackingSheet",
                                  24,
                                  "EAAftercareTrackingSheet.pdf"
                                );
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(24) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              EA Aftercare Tracking Sheet
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-5 printspace">
                            <a
                              className="printLinks"
                              href={`${
                                process.env.REACT_APP_BACKEND_URL
                              }/api/ASBForm?EventID=${
                                JSON.parse(localStorage.getItem("eventID"))
                                  .eventID
                              }&User=${
                                JSON.parse(localStorage.getItem("userData"))
                                  .username
                              }`}
                              target="_blank"
                              onClick={() => {
                                openPDF("ASBForm", 25);
                              }}
                              style={{
                                color:
                                  visitedColors.indexOf(25) === -1
                                    ? "#0079F4"
                                    : "lightblue",
                                cursor: isLoading ? "wait" : "pointer",
                              }}
                            >
                              AB Seniors Benefit Notification
                            </a>
                          </div>
                          <div className="col-md-7 printspacesec">
                            <div style={{ fontSize: "14px" }}>
                              Fax to ASB to update records.
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                      {/* <div>
                        Regarding the Alberta Notification Form - Alberta
                        Seniors Benefit and Alberta Health Care are
                        automatically cancelled if the death occurred in
                        Alberta. For OAS/CPP cancellation please use the form
                        above.
                      </div> */}
                      <hr></hr>
                      <div className="three_button_class">
                        <button
                          class="stylish-button"
                          style={{ marginBottom: "7px", textAlign: "center" }}
                          onClick={handleNavigateModify}
                        >
                          MODIFY ENTRY
                        </button>
                        <button
                          class="stylish-button"
                          style={{ marginBottom: "7px", textAlign: "center" }}
                          onClick={handleNavigate}
                        >
                          NEW ENTRY
                        </button>
                        <button
                          style={{ marginBottom: "7px", textAlign: "center" }}
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

export default PesPrint;
