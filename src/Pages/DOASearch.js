import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import englishLabels from "../json/PesdataEnglish.json";
import { NotificationManager } from "react-notifications";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
const userData = JSON.parse(localStorage.getItem("userData"));
let searchData = {
  d_SIN: "",
  d_Last: "",
  d_First: "",
  e_Last: "",
  contract: "",
  BillingCode: "",
};
// const columns = [
//   { title: "Event ID", field: "eventID" },
//   { title: "Event Stamp", field: "eventDate" },
//   { title: "SIN", field: "d_SIN" },
//   {
//     title: "Deceased's First",
//     field: "d_First",
//     render: (rowData) => (
//       <a
//         href={`/doaupdate/${rowData.eventID}`}
//         style={{ color: "#0079F4", cursor: "pointer" }}
//       >
//         {rowData.d_First}
//       </a>
//     ),
//   },
//   { title: "Deceased's Last", field: "d_Last" },
//   { title: "DOB", field: "d_DOB" },
//   { title: "Executor's Last", field: "e_Last" },
//   { title: "Status", field: "Status" },
//   { title: "LocationID", field: "BillingCode" },
//   { title: "contract", field: "Contract" },
// ];
// "eventID": 32231,

const DOASearch = () => {
  const formateDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [labels, setLabels] = useState({});

  const defaultMaterialTheme = createTheme();
  const currentYear = new Date().getFullYear();
  const [response, setResponse] = useState([]);
  const [formData, setFormData] = useState({
    d_SIN: "",
    d_Last: "",
    d_First: "",
    e_Last: "",
    contract: "",
    BillingCode: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const status = location.state;
  useEffect(() => {
    if (status === true) {
      setFormData([{}]);
      setResponse([]);
      localStorage.removeItem("searchData");
    } else {
      setResponse(data?.response || []);
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...(data?.formData || {}),
      }));
    }
    //  setFormData(status === true ? [{}] : [...(data?.formData || []), ...data?.formData]);
    if (status == true) {
      localStorage.removeItem("searchFields");

      searchData = {
        d_SIN: "",
        d_Last: "",
        d_First: "",
        e_Last: "",
        contract: "",
        BillingCode: "",
      };
      setFormData({
        d_SIN: "",
        d_Last: "",
        d_First: "",
        e_Last: "",
        contract: "",
        BillingCode: "",
      });
    }

    if (
      localStorage.getItem("doalogin") &&
      localStorage.getItem("doalogin") == "i89j2y2"
    ) {
    } else {
      navigate("/doalogin");
    }
  }, []);
  const [focus, setSocus] = useState(false);

  const columns = [
    { title: "Event ID", field: "eventID" },
    {
      title: "Event Stamp",
      field: "eventDate",
      render: (rowData) => formateDate(rowData.eventDate),
    },
    { title: "SIN", field: "d_SIN" },
    {
      title: "Deceased's First",
      field: "d_First",
      render: (rowData) => (
        <a
          onClick={() =>
            navigate(`/doaupdate/${rowData.eventID}`, {
              state: { response, formData },
            })
          }
          href={`/doaupdate/${rowData.eventID}`}
          style={{ color: "#0079F4", cursor: "pointer" }}
        >
          {rowData.d_First}
        </a>
      ),
    },
    { title: "Deceased's Last", field: "d_Last" },
    { title: "DOB", field: "d_DOB" },
    { title: "Executor's Last", field: "e_Last" },
    { title: "Status", field: "Status" },
    { title: "LocationID", field: "BillingCode" },
    { title: "contract", field: "Contract" },
  ];

  useEffect(() => {
    document.getElementById("d_SIN").focus();
  }, [focus]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    searchData[id] = value;
  };

  useEffect(() => {
    if (userData) {
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
    }
  }, []);

  // const handleRowClick = (event, rowData) => {
  //   if (event.type === "click") {
  //     navigate("/doaupdate");
  //   } else if (event.type === "contextmenu") {
  //     // Right click - open in new tab
  //     event.preventDefault();
  //     window.open("/doaupdate", "_blank");
  //   }
  // };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Extract the components of the date and time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Construct the desired format
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDate;
  }
  const handleSearch = async (e) => {
    if (
      searchData.d_SIN === "" &&
      searchData.d_Last === "" &&
      searchData.d_First === "" &&
      searchData.e_Last === "" &&
      searchData.contract === "" &&
      searchData.BillingCode === ""
    ) {
      NotificationManager.info("Fill atleast one field!!");
      return;
    }
    setResponse([]);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/search_pes_events/?d_SIN=${searchData.d_SIN}&d_Last=${searchData.d_Last}&d_First=${searchData.d_First}&e_Last=${searchData.e_Last}&contract=${searchData.contract}&BillingCode=${searchData.BillingCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("jpd")}`,
          },
        }
      );
      setSocus((prevState) => !prevState);
      // document.getElementById("d_SIN").focus();
      // response.data.sort(
      //   (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
      // );
      response.data.forEach((a) => {
        a.eventDate = formatDate(a.eventDate);
      });

      if (response.data.length === 1) {
        navigate(`/doaupdate/${response.data[0].eventID}`);
        return;
      }
      if (response.data.length === 0) {
        NotificationManager.error(`No record found`);
        return;
      }
      // localStorage.setItem("searchFields", JSON.stringify(searchData));
      // localStorage.setItem("searchData", JSON.stringify(response.data));
      setResponse(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("doalogin");
        navigate("/doalogin");
      }
      console.error("Error Fetchig", error);
      NotificationManager.error(
        `Error Searching Data!! Contact Administrator `
      );
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
                  <div
                    className="card mb-4"
                    style={{ backgroundColor: "rgb(242, 246, 252)" }}
                  >
                    <div className="card-body">
                      <div
                        className="three_button_class"
                        style={{ marginBottom: "20px" }}
                      >
                        <h1>Search Screen</h1>
                        <button
                          className="stylish-button"
                          style={{ width: "200px", visibility: "hidden" }}
                        >
                          NEW ENTRY
                        </button>
                        <a
                          style={{ width: "200px" }}
                          className="stylish-button"
                          href="/doa"
                        >
                          Go to Home
                        </a>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">SIN/SSN</label>
                          <input
                            className="form-control"
                            id="d_SIN"
                            type="text"
                            style={{
                              borderWidth: "3px",
                              borderColor: formData.d_SIN !== "" ? "blue" : "",
                            }}
                            value={searchData.d_SIN}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">
                            Deceased's Last Name
                          </label>
                          <input
                            className="form-control"
                            id="d_Last"
                            type="text"
                            style={{
                              borderWidth: "3px",
                              borderColor: formData.d_Last !== "" ? "blue" : "",
                            }}
                            value={searchData.d_Last}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">
                            Deceased's First Name
                          </label>
                          <input
                            className="form-control"
                            id="d_First"
                            type="text"
                            style={{
                              borderWidth: "3px",
                              borderColor:
                                formData.d_First !== "" ? "blue" : "",
                            }}
                            value={searchData.d_First}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">
                            Executor's Last Name
                          </label>
                          <input
                            className="form-control"
                            id="e_Last"
                            type="text"
                            style={{
                              borderWidth: "3px",
                              borderColor: formData.e_Last !== "" ? "blue" : "",
                            }}
                            value={searchData.e_Last}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Purchase Order #</label>
                          <input
                            className="form-control"
                            id="contract"
                            type="text"
                            style={{
                              borderWidth: "3px",
                              borderColor:
                                formData.contract !== "" ? "blue" : "",
                            }}
                            value={searchData.contract}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">LocationID</label>
                          <input
                            className="form-control"
                            id="BillingCode"
                            type="text"
                            style={{
                              borderWidth: "3px",
                              borderColor:
                                formData.BillingCode !== "" ? "blue" : "",
                            }}
                            value={searchData.BillingCode}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div
                        className="three_button_class"
                        style={{ marginBottom: "20px" }}
                      >
                        <button
                          style={{ width: "200px" }}
                          className="stylish-button"
                          onClick={() => {
                            localStorage.removeItem("searchFields");
                            localStorage.removeItem("searchData");
                            searchData = {
                              d_SIN: "",
                              d_Last: "",
                              d_First: "",
                              e_Last: "",
                              contract: "",
                              BillingCode: "",
                            };
                            setFormData({
                              d_SIN: "",
                              d_Last: "",
                              d_First: "",
                              e_Last: "",
                              contract: "",
                              BillingCode: "",
                            });
                            setResponse([]);
                            setSocus((prevState) => !prevState);
                            // window.location = "/doasearch";
                          }}
                        >
                          Clear Results
                        </button>

                        <button
                          style={{ width: "200px" }}
                          className="stylish-button"
                          onClick={handleSearch}
                        >
                          Search
                        </button>
                        <button
                          className="stylish-button"
                          style={{ width: "200px", visibility: "hidden" }}
                        >
                          NEW ENTRY
                        </button>
                      </div>
                    </div>
                    {response.length !== 0 && (
                      <ThemeProvider theme={defaultMaterialTheme}>
                        <MaterialTable
                          title=" Search Results"
                          columns={columns}
                          data={response}
                          options={{
                            search: true,
                            // sorting: true,
                            paging: false,
                            actionsColumnIndex: -1,
                          }}
                        />
                      </ThemeProvider>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Abdul Razzaq Code  */}

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

export default DOASearch;
