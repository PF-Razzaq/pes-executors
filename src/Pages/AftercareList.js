import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Print, HourglassEmpty } from "@mui/icons-material";
import { useNavigate } from "react-router";
import englishLabels from "../json/AftercareListEnglish.json";
// import frenchLabels from "../json/AftercareListFrench.json";
import axios from "axios";
import ImageContainer from "./ImageContainer";
import { Geste_Instance } from "../services/services";


const userData = JSON.parse(localStorage.getItem("userData"));
const AftercareList = () => {
  const [labels, setLabels] = useState({});
  const [loading, setLoading] = useState(false);
  const [ModifyRecord, setModifyRecord] = useState([]);
  const currentYear = new Date().getFullYear();
  const defaultMaterialTheme = createTheme();
  const navigate = useNavigate();
  const handleNavigate = () => {
    window.scrollTo(0, 0);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Attempting to logout");
    try {
      const response = await Geste_Instance.post(`/api/logout/`);
      console.log("Logout successful", response);
      setLoading(false);
      // Uncomment these lines to remove user data from local storage
      localStorage.removeItem("userData");
      localStorage.removeItem("jwt");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  const formateDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const fetchData = async () => {
    try {
      const userData = localStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      const LocationID = parsedUserData.LocationID;
      console.log("fspidmmm", LocationID);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/after_care/${LocationID}`
      );
      console.log("responsepesmodify", response.data);
      console.log(Array.isArray(response.data.result));
      setModifyRecord(response.data);
      console.log("setModifyRecord", setModifyRecord);
      console.log("ModifyRecord", ModifyRecord);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
 
  useEffect(() => {
    fetchData(); // Invoke the fetchData function when the component mounts
    if (userData) {
      console.log("rw34", userData, userData.RoutingID);
      if (userData.RoutingID == 100 || userData.RoutingID == null) {
        englishLabels.selectedLanguage = "en";
        setLabels(englishLabels);
      } else {
        englishLabels.selectedLanguage = "en";
        setLabels(englishLabels);
      }
    }
  }, []);
  const eventFetchData = async (eventID) => {
    const obj = { eventID: eventID };
    localStorage.setItem("eventID", JSON.stringify(obj));
    window.scrollTo(0, 0);
    navigate("/executorPrint");
  };
  const handleEdit = (event, rowData) => {
    eventFetchData(rowData.EventID);
    console.log(rowData);
  };
  const columns = [
    {
      title: labels["11"],
      field: "eventdate",
      render: (rowData) => formateDate(rowData.eventdate),
    },
    { title: labels["12"], field: "d_First" },
    { title: labels["13"], field: "d_Last" },
    { title: labels["14"], field: "e_Last" },
    { title: labels["17"], field: "Status" },

    {
      title: labels["16"],
      field: "actions",
      render: (rowData) => (
        <div>
          {loading === false && (
            <Print
              style={{ cursor: "pointer" }}
              onClick={(event) => handleEdit(event, rowData)}
            />
          )}
          {3 === 4 && <HourglassEmpty />}
        </div>
      ),
    },
  ];
  return (
    <>
      <form>
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <main style={{ fontSize: "18px" }}>
              <div className="container-xl px-4 mt-4">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card mb-4">
                      <ImageContainer
                        selectedLanguage={labels.selectedLanguage}
                      />
                      <div className="card-body">
                        <div style={{}}>
                          {" "}
                          <h2 style={{ fontWeight: "bold" }}> {labels["1"]}</h2>
                        </div>
                        <hr></hr>
                        <p style={{}}>{labels["2"]}</p>

                        <p>{labels["3"]}</p>

                        <p style={{}}>{labels["4"]}</p>

                        <p>{labels["5"]}</p>
                        <p>{labels["6"]}</p>

                        {/* <p style={{ color: "blue" }}>{labels["7"]}</p> */}
                        <p>{labels["8"]}</p>
                      </div>

                      <div className="card-header" style={{ color: "black" }}>
                        {" "}
                        {labels["9"]}
                      </div>
                      <div className="card-body">
                        <div className="row gx-3 mb-3">
                          <div>
                            <div>
                              <ThemeProvider theme={defaultMaterialTheme}>
                                <MaterialTable
                                  title=" Details"
                                  columns={columns}
                                  data={ModifyRecord}
                                  options={{
                                    search: true,
                                    sorting: true,
                                    paging: false,
                                    actionsColumnIndex: -1,
                                  }}
                                />
                              </ThemeProvider>
                            </div>
                            <div style={{
                              textAlign: "center",
                              margin: "12px"
                              }}>
                            <a
                              style={{
                                width: "20%",
                              }}
                              href="/input"
                              id="newEntry"
                              class="stylish-button"
                              onClick={handleNavigate}
                            >
                              {labels["15"]}
                            </a>
                            <button
                            onClick={handleLogout}
                        style={{ marginLeft: "35%" }}
                        class="stylish-buttonSignout"
                        
                      >
                        Sign Out
                      </button>
                            </div>
                           
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
      </form>
    </>
  );
};

export default AftercareList;
