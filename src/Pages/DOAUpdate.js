import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import englishLabels from "../json/PesdataEnglish.json";
import { NotificationManager } from "react-notifications";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Auth_Instance } from "../services/axiosservices";
// const userData = JSON.parse(localStorage.getItem("userData"));

let routingID = 104;
const columns = [
  {
    title: "Status",
    field: "Status",
    cellStyle: {
      fontSize: "14px",
      padding: "1px", // Set font size for this column
      width: "15%", // Set width based on percentage
    },
    headerStyle: {
      width: "15%", // Ensure header has the same width
    },
  },
  {
    title: "DateStamp",
    field: "Date",
    cellStyle: {
      fontSize: "14px",
      padding: "1px", // Set font size for this column
      width: "15%", // Set width based on percentage
    },
    headerStyle: {
      width: "15%", // Ensure header has the same width
    },
  },
  {
    title: "FaxDate",
    field: "EventUpdateFaxDate",
    cellStyle: {
      fontSize: "14px",
      padding: "1px", // Set font size for this column
      width: "15%", // Set width based on percentage
    },
    headerStyle: {
      width: "15%", // Ensure header has the same width
    },
  },
  {
    title: "Notes",
    field: "Notes",
    cellStyle: {
      fontSize: "14px",
      padding: "1px", // Set font size for this column
      width: "55%", // Set width based on percentage
    },
    headerStyle: {
      width: "55%", // Ensure header has the same width
    },
  },
];

const DOAUpdate = () => {
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
  const { eventID } = useParams();
  const [country, setCountry] = useState([]);
  const [updateEvents, setUpdateEvents] = useState([]);
  const [labels, setLabels] = useState(englishLabels);
  const currentYear = new Date().getFullYear();
  const [statusFields, setStatusFields] = useState({});
  console.log("eventID44", eventID);
  const [statusDropDown, setstatusDropDown] = useState([]);
  const navigate = useNavigate();
  const defaultMaterialTheme = createTheme();
  const location = useLocation();
  const data = location.state;
  console.log("🚀 ~ DOAUpdate ~ datalocationlllllllllllll:", data);
  const getCountgries = async () => {
    Auth_Instance.get("/api/countries/")
      .then((response) => {
        console.log(response.data);
        setCountry(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const toolbarDiv = document.querySelector(
      ".MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular"
    );

    // Check if the element exists and then modify its min-height
    if (toolbarDiv) {
      toolbarDiv.style.minHeight = "34px";
    }
    getCountgries();
    if (
      localStorage.getItem("doalogin") &&
      localStorage.getItem("doalogin") == "i89j2y2"
    ) {
    } else {
      localStorage.removeItem("doalogin");
      navigate("/doalogin");
    }
    if (eventID) {
      fetchData();
      fetchEventUpdates();
      fetchDropdown();
    }
  }, []);
  // const checkBC = async (fspid) => {
  //   try {
  //     let data = JSON.stringify({
  //       FSPID: "515",
  //     });

  //     let config = {
  //       method: "get",
  //       maxBodyLength: Infinity,
  //       url: "https://beta.progressiveestatesolutions.com:8000/api/fsp/",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };

  //     axios
  //       .request(config)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.error("Error Fetchig", error);
  //     NotificationManager.error(`Error Fetchig Data!! Contact Administrator `);
  //   }
  // };
  const fetchEventUpdates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/getUpdate/${eventID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("jpd")}`,
          },
        }
      );
      if (response.data[0]) {
        // document.getElementById("status").value = response.data[0].Status;
      }
      response.data = updateDates(response.data);
      setUpdateEvents(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("doalogin");
        navigate("/doalogin");
      }
      console.error("Error Fetchig", error);
      NotificationManager.error(`Error Fetchig Data!! Contact Administrator `);
    }
  };
  const updateDates = (data) => {
    return data.map((item) => {
      // Check if the field 'EventUpdateFaxDate' exists and modify it
      if (item.EventUpdateFaxDate) {
        item.EventUpdateFaxDate = item.EventUpdateFaxDate.split("T")[0];
      }

      // Check if the field 'Date' exists and modify it
      if (item.Date) {
        item.Date = item.Date.split("T")[0];
      }

      return item;
    });
  };
  const fetchStatusFields = async (iscomplete, obj) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/get_full_dump/${eventID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("jpd")}`,
          },
        }
      );
      console.log("fetchStatusFields", response.data);

      setStatusFields(response.data);

      document.getElementById("FaxDate").value = obj.FaxDate;
      document.getElementById("ReportDate").value = obj.ReportDate;

      setFormData(obj);

      // if (iscomplete === true) {
      //   document.getElementById("FaxDate").value = response.data.MaxOfFax;
      //   document.getElementById("ReportDate").value = response.data.MaxOfReport;
      // }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("doalogin");
        navigate("/doalogin");
      }
      console.error("Error Fetchig", error);
      NotificationManager.error(`Error Fetchig Data!! Contact Administrator `);
    }
  };
  const fetchDropdown = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/updates/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("jpd")}`,
          },
        }
      );
      response.data = response.data.filter((a) => a.UpdateDesc !== "Include");
      response.data = response.data.filter(
        (a) => a.UpdateDesc !== "HOLD - Missing PO"
      );
      setstatusDropDown(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("doalogin");
        navigate("/doalogin");
      }
      console.error("Error Fetchig", error);
      NotificationManager.error(`Error Fetchig Data!! Contact Administrator `);
    }
  };
  function reverseConvertDate(dateStr) {
    if (dateStr) {
      const [day, monthName, year] = dateStr.split(" ");

      // Define an object with month names and their corresponding numbers
      const monthNames = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };

      // Get the corresponding numeric month
      const month = monthNames[monthName];

      // Format and return the new date string
      return `${day}/${month}/${year}`;
    }
  }
  function convertDate(dateStr) {
    // Split the input date string by '/'
    const [day, month, year] = dateStr.split("/");

    // Define an array with month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Convert the month from string to integer and get the corresponding month name
    const monthName = monthNames[parseInt(month, 10) - 1];

    // Format and return the new date string
    return `${day} ${monthName} ${year}`;
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/${eventID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("jpd")}`,
          },
        }
      );
      if (response.data.d_dispdate !== null) {
        response.data.d_dispdate = response.data.d_dispdate.split("-")[0];
        // response.data.d_dispdate = convertDate(response.data.d_dispdate);
      }
      response.data.UpdateID = null;
      let iscomplete = false;

      // checkBC(response.data.FSPID);
      fetchStatusFields(iscomplete, response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("doalogin");
        navigate("/doalogin");
      }
      console.error("Error Fetchig11", error);
      NotificationManager.error(`Error Fetchig Data!! Contact Administrator `);
    }
  };
  const [formData, setFormData] = useState({ UpdateID: null });
  console.log(formData);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const updateRecord = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    if (formData.UpdateID !== "100") {
      // formData.FaxDate = "";
      // formData.ReportDate = "";
    }

    /* if (!formData.UpdateID) {
      NotificationManager.info("Changes Status before updating");
      return;

    }*/

    // if (
    //   formData.UpdateID !== "100" &&
    //   (document.getElementById("match").checked === false ||
    //     formData.FaxDate.trim() === "" ||
    //     formData.ReportDate.trim() === "")
    // ) {
    //   NotificationManager.info(
    //     "100% match should be checked and Fax Date and Report Date should not be blank unless complete"
    //   );
    //   return;
    // }

    const obj = { ...formData };
    // obj.d_dispdate = reverseConvertDate(formData.d_dispdate);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/event_admin/`,
        obj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("jpd")}`,
          },
        }
      );
      document.getElementById("match").checked = false;
      localStorage.setItem("dispDate", formData.d_dispdate);
      fetchEventUpdates();
      NotificationManager.success("Record updated successfully");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("doalogin");
        navigate("/doalogin");
      }
      console.error("Error updating9", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        NotificationManager.error(`${error.response.data.message}`);
      } else {
        NotificationManager.error(
          `Error updating Data!! Contact Administrator `
        );
      }
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
                    <div className="card-header">Display Records</div>
                    <div className="card-body">
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["10"]}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
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
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["11"]}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_middle_a"
                                type="text"
                                value={formData.d_middle_a}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        {/* <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3"><label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          ></label></div>
                            <div className="col-sm-6">
                            <input
                          style={{height:"20px", padding:"11px 11px"}}
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
                          </div>
                          
                          
                        </div> */}
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label className="small mb-1">
                                {labels["12"]}&nbsp;
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_middle_b"
                                type="text"
                                value={formData.d_middle_b}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Last Name
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_Last"
                                type="text"
                                //   placeholder="Enter First Name"
                                value={formData.d_Last}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Maiden Name
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{
                                  height: "20px",
                                  padding: "11px 11px",
                                  fontSize: "14px",
                                  padding: "1px",
                                }}
                                className="form-control"
                                id="d_Maiden"
                                type="text"
                                value={formData.d_Maiden}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Date of Birth
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{
                                  height: "20px",
                                  padding: "11px 11px",

                                  display: "hidden",
                                }}
                                className="form-control"
                                id="d_DOB"
                                type="text"
                                value={formData.d_DOB}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>{" "}
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Date of Death
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_DOD"
                                type="text"
                                value={formData.d_DOD}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>{" "}
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Age
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_death_age"
                                type="text"
                                //   placeholder="Enter Street Address"
                                value={formData.d_death_age}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6"></div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                SIN
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_SIN"
                                type="text"
                                //   placeholder="Enter City/Town"
                                value={formData.d_SIN}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                {labels["53"]}&nbsp;
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <select
                                style={{
                                  height: "25px",
                                  padding: "0px 0px 0px 11px",
                                }}
                                className="form-select"
                                aria-label="Default select example"
                                id="e_Salutation"
                                type="text"
                                value={formData.e_Salutation}
                                onChange={handleChange}
                              >
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
                        </div>
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Executor First
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_First"
                                type="text"
                                value={formData.e_First}
                                onChange={handleChange}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Executor Last
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_Last"
                                type="text"
                                value={formData.e_Last}
                                onChange={handleChange}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Executor Middle
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_Initial"
                                type="text"
                                value={formData.e_Initial}
                                onChange={handleChange}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                P.O.#
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="Contract"
                                type="text"
                                value={formData.Contract}
                                onChange={handleChange}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row gx-3">
                        
                      </div> */}
                      <hr />
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Fax Date
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="FaxDate"
                                type="text"
                                // value={formData.FaxDate}
                                onChange={handleChange}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row  gx-3">
                        {" "}
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Report Date
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="ReportDate"
                                type="text"
                                // value={formData.ReportDate}
                                onChange={handleChange}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                New Status
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <select
                                style={{
                                  height: "25px",
                                  padding: "0px 0px 0px 11px",
                                }}
                                id="UpdateID"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    FaxDate: statusFields.MaxOfFax,
                                    ReportDate: statusFields.MaxOfReport,
                                    UpdateID:
                                      e.target.value === ""
                                        ? null
                                        : e.target.value,
                                  }));
                                }}
                              >
                                <option selected value=""></option>
                                {statusDropDown.map((option) => (
                                  <option
                                    key={option.UpdateID}
                                    value={option.UpdateID}
                                  >
                                    {option.UpdateDesc}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Status
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="status"
                                type="text"
                                disabled
                                value={formData.Status}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Notes
                              </label>
                            </div>
                            <div className="col-sm-8 mt-1">
                              <textarea
                                id="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "5px",
                                }}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                100% Match
                              </label>
                            </div>
                            <div className="col-sm-6">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="ms-3"
                                id="match"
                                type="checkbox"
                                onChange={(e) => {
                                  if (e.target.checked === true) {
                                    document.getElementById(
                                      "UpdateID"
                                    ).selectedIndex = 1;

                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      FaxDate: statusFields?.MaxOfFax || "",
                                      ReportDate:
                                        statusFields?.MaxOfReport || "",
                                      UpdateID: "100",
                                    }));
                                    document.getElementById("FaxDate").value =
                                      statusFields?.MaxOfFax || "";
                                    document.getElementById(
                                      "ReportDate"
                                    ).value = statusFields?.MaxOfReport || "";
                                    return;
                                  } else {
                                    document.getElementById(
                                      "UpdateID"
                                    ).selectedIndex = 0;

                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                    }));
                                    document.getElementById("FaxDate").value =
                                      "";
                                    document.getElementById(
                                      "ReportDate"
                                    ).value = "";
                                    return;
                                  }
                                }}
                                //   placeholder="Enter Postal"
                                required
                              />
                            </div>
                            <button
                              onClick={updateRecord}
                              id="newEntry"
                              style={{
                                marginBottom: "20px",
                                width: "30%",

                                fontSize: "18px",
                              }}
                              class="stylish-button"
                            >
                              Update Record
                            </button>
                          </div>
                        </div>
                      </div>

                      <ThemeProvider theme={defaultMaterialTheme}>
                        <MaterialTable
                          title="Search Results"
                          columns={columns}
                          data={updateEvents}
                          options={{
                            search: false,
                            sorting: false,
                            paging: false,
                            actionsColumnIndex: -1,
                            headerStyle: {
                              padding: 0, // Adjust padding in the header if needed
                            },
                            toolbarStyle: {
                              paddingTop: 1, // Decrease padding above text
                              paddingBottom: 1, // Decrease padding below text
                              height: "20px", // Adjust row height
                            },
                          }}
                        />
                      </ThemeProvider>

                      <div
                        className="text-center"
                        style={{ cursor: "pointer", marginTop: "20px" }}
                      >
                        <a
                          onClick={() =>
                            navigate(`/doasearch`, { state: data })
                          }
                          // href="/doasearch"
                          className="text-primary text-decoration-underline"
                        >
                          Cancel Changes and return to Search Page
                        </a>
                        <br />
                        <a
                          href="/doasearch"
                          className="text-primary text-decoration-underline"
                        >
                          Return To BLANK Search Page
                        </a>
                      </div>
                      <div className="row gx-3 mb-1 mt-2">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Record Created
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="eventdate"
                                type="text"
                                value={formateDate(formData.eventdate)}
                                onChange={handleChange}
                                //   placeholder="Enter Area Code"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3 mb-1 mt-2">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3" style={{ width: "22%" }}>
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Deceased Address
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-8">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_Address"
                                type="text"
                                value={formData.d_Address}
                                onChange={handleChange}
                                //   placeholder="Enter Area Code"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-2">
                              <label className="small mb-1" htmlFor="d_Month">
                                Unit
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_Unit"
                                type="text"
                                value={formData.d_Unit}
                                onChange={handleChange}
                                //   placeholder="Enter Area Code"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        {/* Form Group (last name)*/}
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                City
                              </label>
                            </div>
                            <div className="col-sm-7">
                              {" "}
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_City"
                                type="text"
                                value={formData.d_City}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Prov
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_Prov"
                                type="text"
                                value={formData.d_Prov}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Postal
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_Postal"
                                type="text"
                                value={formData.d_Postal}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Country
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <select
                                style={{
                                  height: "25px",
                                  padding: "0px 0px 0px 11px",
                                }}
                                className="form-select"
                                aria-label="Default select example"
                                id="d_Country"
                                value={formData.d_Country}
                                onChange={handleChange}
                                defaultValue={formData.d_Country}
                              >
                                <option value=" ">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                </option>
                                {country.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.name_value}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Birth City
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_birth_City"
                                type="text"
                                value={formData.d_birth_City}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Prov
                              </label>
                            </div>
                            <div className="col-sm-7">
                              {" "}
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_birth_Prov"
                                type="text"
                                value={formData.d_birth_Prov}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Country
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <select
                                style={{
                                  height: "25px",
                                  padding: "0px 0px 0px 11px",
                                }}
                                className="form-select"
                                aria-label="Default select example"
                                id="d_birth_Country"
                                value={formData.d_birth_Country}
                                onChange={handleChange}
                                defaultValue={formData.d_birth_Country}
                              >
                                <option value=" ">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                </option>
                                {country.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.name_value}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Death City
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_death_City"
                                type="text"
                                value={formData.d_death_City}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Prov
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_death_Prov"
                                type="text"
                                value={formData.d_death_Prov}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Country
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <select
                                style={{
                                  height: "25px",
                                  padding: "0px 0px 0px 11px",
                                }}
                                className="form-select"
                                aria-label="Default select example"
                                id="d_death_Country"
                                value={formData.d_death_Country}
                                onChange={handleChange}
                                defaultValue={formData.d_death_Country}
                              >
                                <option value=" ">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                </option>
                                {country.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.name_value}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Health #
                              </label>
                            </div>
                            <div className="col-sm-7">
                              {" "}
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                type="text"

                                // onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Cemetery
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_disp_Name"
                                type="text"
                                value={formData.d_disp_Name}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Date
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="d_dispdate"
                                type="text"
                                value={formData.d_dispdate}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row gx-3">
                        {routingID == 104 && (
                          <div className="col-md-4">
                            <button
                              style={{
                                marginTop: "20px",
                                marginBottom: "10px",
                              }}
                              class="stylish-button"
                              onClick={() => {
                                if (localStorage.getItem("dispDate"))
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d_dispdate:
                                      localStorage.getItem("dispDate"),
                                  }));
                              }}
                            >
                              Remembered
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="row gx-3 mt-2">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-3" style={{ width: "22%" }}>
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Executor Address
                              </label>
                            </div>
                            <div className="col-sm-8">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_Address"
                                type="text"
                                value={formData.e_Address}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-2">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Unit
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_Unit"
                                type="text"
                                value={formData.e_Unit}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                City
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_City"
                                type="text"
                                value={formData.e_City}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Prov
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_Prov"
                                type="text"
                                value={formData.e_Prov}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Postal
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_Postal"
                                type="text"
                                value={formData.e_Postal}
                                onChange={handleChange}

                                //   placeholder="Enter City/Town"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              {" "}
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                Country
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <select
                                style={{
                                  height: "25px",
                                  padding: "0px 0px 0px 11px",
                                }}
                                className="form-select"
                                aria-label="Default select example"
                                id="e_Country"
                                value={formData.e_Country}
                                onChange={handleChange}
                                defaultValue={formData.e_Country}
                              >
                                <option value=" ">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                </option>
                                {country.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.name_value}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row gx-3">
                        {/* Form Group (last name)*/}
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["64"]}&nbsp;
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_AreaCode"
                                type="text"
                                value={formData.e_AreaCode}
                                onChange={handleChange}
                                required
                                //   placeholder="Enter Area Code"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["65"]}&nbsp;
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_exchange"
                                type="text"
                                value={formData.e_exchange}
                                onChange={handleChange}
                                required
                                //   placeholder="Enter Exchange"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["66"]}&nbsp;
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}{" "}
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="e_phone_4"
                                type="text"
                                value={formData.e_phone_4}
                                onChange={handleChange}
                                required
                                //   placeholder="Enter Phone No"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                Relationship
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <select
                                style={{
                                  height: "25px",
                                  padding: "0px 0px 0px 11px",
                                }}
                                className="form-select"
                                aria-label="Default select example"
                                id="e_relationship"
                                value={formData.e_relationship}
                                onChange={handleChange}
                              >
                                <option value="Executor">
                                  {" "}
                                  {labels["173"]}
                                </option>
                                <option value="Next of Kin">
                                  {labels["174"]}
                                </option>
                                <option value="Declared Responsible Person">
                                  {labels["175"]}
                                </option>
                                <option value="Legal Representative">
                                  {labels["176"]}
                                </option>
                                <option value="Informant">
                                  {labels["177"]}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        {/* Form Group (last name)*/}
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                FSPID
                              </label>
                            </div>
                            <div className="col-sm-7">
                              <input
                                style={{ height: "20px", padding: "11px 11px" }}
                                className="form-control"
                                id="FSPID"
                                type="text"
                                onChange={handleChange}
                                value={formData.FSPID}
                                // disabled
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
