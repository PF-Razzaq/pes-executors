import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Delete, Edit, Download } from "@mui/icons-material";
import { useNavigate } from "react-router";
import englishLabels from "../json/PesModifyRecordEnglish.json";
import frenchLabels from "../json/PesModifyRecordFrench.json";
import axios from "axios"; // Import Axios
import ImageContainer from "./ImageContainer";

const userData = JSON.parse(localStorage.getItem("userData"));
const PesModifyRecord = () => {
  const [labels, setLabels] = useState({});
  const [ModifyRecord, setModifyRecord] = useState([]);
  const currentYear = new Date().getFullYear();
  const defaultMaterialTheme = createTheme();
  const navigate = useNavigate();
  const handleNavigate = () => {
    window.scrollTo(0, 0);
  };
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
      console.log("LocationID", LocationID);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/modifier_page/${LocationID}`
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
    window.scrollTo(0, 0);
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

  const handleEdit = (event, rowData) => {
    console.log(rowData);
    window.scrollTo(0, 0);
    navigate(`/modifyRecord/${rowData.EventID}`);
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
    { title: labels["19"], field: "Status" },
    {
      title: labels["16"],
      field: "actions",
      render: (rowData) => (
        <div>
          <Edit
            style={{ cursor: "pointer" }}
            onClick={(event) => handleEdit(event, rowData)}
          />
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
                        {/* <p style={{}}>{labels["2"]}</p> */}

                        <p>{labels["3"]}</p>

                        <p style=
                        {{}}>{labels["4"]}
                           <a
                            style={{ cursor: "pointer" }}
                            href="/aftercare"
                          >
                            {labels["18"]}
                          </a>
                         {labels["5"]}
                             
                         {" "}
                          <a href="mailto:ReSubmit@ProgressiveEstateSolutions.com">
                            ReSubmit@ProgressiveEstateSolutions.com{" "}
                          </a>
                          or call 1-888-421-6685 or (905) 822-7675
                        </p>

                        {/* <p>
                         
                        </p> */}

                        <p>
                          {labels["6"]}
                          <a
                            style={{ cursor: "pointer" }}
                            href="/aftercare"
                          >
                            {labels["18"]}
                          </a>
                          {labels["17"]}
                        </p>

                        {/* <p style={{}}>{labels["7"]}</p>
                        <p>
                          {labels["8"]}{" "}
                          <a
                            href="/aftercare"
                            style={{ color: "#0079F4", cursor: "pointer" }}
                          >
                            {labels["18"]}
                          </a>
                        </p> */}
                      </div>

                      {/* <div className="card-header" style={{ color: "blue" }}>
                        {" "}
                        {labels["20"]}
                      </div> */}

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
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <a
                                href="/input"
                                style={{
                                  margin: "0.8rem auto",
                                }}
                                id="newEntry"
                                class="stylish-button"
                                onClick={handleNavigate}
                              >
                                {labels["15"]}
                              </a>
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

export default PesModifyRecord;
