import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import englishLabels from "../json/PesdataEnglish.json";
import { NotificationManager } from "react-notifications";
import ImageContainer from "./ImageContainer";
import ExcelJS from "exceljs";
let flag = false;
const userData = JSON.parse(localStorage.getItem("userData"));
const jsonData = [
  { name2: "John Doe", age: 28, email: "john.doe@example.com" },
  { name2: "Jane Smith", age: 34, email: "jane.smith@example.com" },
  { name2: "Samuel Green", age: 45, email: "samuel.green@example.com" },
];

const DOAReports = () => {
  const navigate = useNavigate();
  const [wait, setWait] = useState(false);

  const [downloadFileName, setDownloadFileName] = useState(null);
  useEffect(() => {
    if (wait === true) {
      document.body.style.cursor = "wait";
      document.querySelectorAll("*").forEach((el) => {
        el.style.cursor = "wait";
      });
    } else {
      document.body.style.cursor = "default";
      document.querySelectorAll("*").forEach((el) => {
        el.style.cursor = "default";
      });
    }
  }, [wait]);
  useEffect(() => {
    if (
      localStorage.getItem("doalogin") &&
      localStorage.getItem("doalogin") == "i89j2y2"
    ) {
    } else {
      navigate("/doalogin");
    }
    // generateExcel(1, true);
  }, []);
  const downloadLinkRef = useRef(null);
  const [excelURL, setExcelURL] = useState(null);
  const generateExcel = async (flag, onStart) => {
    console.log("wait4");
    if (wait !== true) {
      setWait(true);

      try {
        let response;
        if (flag == 1) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/events_list/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 2) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/events_list_2/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 3) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/events_list_30/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 4) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/events_list_hold/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 5) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/download_user/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 6) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/download_locations/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 7) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/doa_tomorrow_report/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 8) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/three_days_ago_report/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }

        if (flag == 9) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/report/60/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 10) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/report/90/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 11) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/report/180/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }
        if (flag == 12) {
          response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/report/365/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("jpd")}`,
              },
            }
          );
        }

        console.log("generateExcel4", response.data, typeof response.data);

        if (
          typeof response.data === "string" &&
          response.data == "No Record Found" &&
          onStart === false
        ) {
          setWait(false);

          NotificationManager.error("No Record Found");
          return;
        }
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");

        if (typeof response.data === "object") {
          const replaceSlashInStrings = (arr) => {
            return arr.map((obj) => {
              const newObj = { ...obj };

              if (newObj.eventdate && typeof newObj.eventdate === "string") {
                const [datePart, timePart] = newObj.eventdate.split(" ");
                const [day, month, year] = datePart.split("/");

                // Create a date object with time
                newObj.eventdate = new Date(
                  `${year}-${month}-${day}T${timePart}:00`
                );

                // Subtract 8 hours from the eventdate
                newObj.eventdate.setHours(newObj.eventdate.getHours() - 8);
              }

              if (newObj.ReportDate && typeof newObj.ReportDate === "string") {
                const [datePart, timePart] = newObj.ReportDate.split(" ");
                const [day, month, year] = datePart.split("/");

                // Create a date object with time
                newObj.ReportDate = new Date(
                  `${year}-${month}-${day}T${timePart}:00`
                );

                // Subtract 8 hours from the ReportDate
                newObj.ReportDate.setHours(newObj.ReportDate.getHours() - 8);
              }

              if (newObj.d_DOD && typeof newObj.d_DOD === "string") {
                const [day, month, year] = newObj.d_DOD.split("/");
                newObj.d_DOD = new Date(`${year}-${month}-${day}`);
              }
              if (newObj.d_DOB && typeof newObj.d_DOB === "string") {
                const [day, month, year] = newObj.d_DOB.split("/");
                newObj.d_DOB = new Date(`${year}-${month}-${day}`);
              }
              if (newObj.FaxDate && typeof newObj.FaxDate === "string") {
                const [day, month, year] = newObj.FaxDate.split("/");
                newObj.FaxDate = new Date(`${year}-${month}-${day}`);
              }
              return newObj;
            });
          };

          // Apply the date conversion
          response.data = replaceSlashInStrings(response.data);

          const columns = Object.keys(response.data[0]).map((key) => ({
            header: key,
            key,
            style:
              key === "eventdate"
                ? { numFmt: "dd/mm/yyyy hh:mm" }
                : key === "d_DOD"
                ? { numFmt: "dd/mm/yyyy" }
                : key === "ReportDate"
                ? { numFmt: "dd/mm/yyyy hh:mm" }
                : key === "FaxDate"
                ? { numFmt: "dd/mm/yyyy" }
                : key === "d_DOB"
                ? { numFmt: "dd/mm/yyyy" }
                : {},
          }));

          worksheet.columns = columns;

          // Add the rows to the worksheet
          response.data.forEach((data) => {
            worksheet.addRow(data);
          });

          // Generate and download the Excel file
          const buffer = await workbook.xlsx.writeBuffer();
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = URL.createObjectURL(blob);

          // if (onStart === true) {
          //   setExcelURL(url);
          //   setDownloadFileName("DailyReport.xlsx");
          //   return;
          // }

          const link = document.createElement("a");
          link.href = url;

          link.download = "report.xlsx";


          if (flag == 1) {
            link.download = "DailyReport.xlsx";
          }
          if (flag == 2) {
            link.download = "YesterdayReport.xlsx";
          }
          console.log("flag2", flag);
          if (flag == 3) {
            console.log("flag3", flag);

            link.download = "30DayReport.xlsx";
          }
          if (flag == 4) {
            link.download = "HoldReport.xlsx";
          }
          if (flag == 5) {
            link.download = "UserReport.xlsx";
          }
          if (flag == 6) {
            link.download = "Locations.xlsx";
          }
          if (flag == 7) {
            link.download = "TomorrowReport.xlsx";
          }
          if (flag == 8) {
            link.download = "3DaysagoReport.xlsx";
          }
          if (flag == 9) {
            link.download = "60DayReport.xlsx";
          }
          if (flag == 10) {
            link.download = "90dayReport.xlsx";
          }
          if (flag == 11) {
            link.download = "180dayReport.xlsx";
          }
          if (flag == 12) {
            link.download = "365dayReport.xlsx";
          }

          // Trigger the download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          setWait(false);

        }
      } catch (error) {
        setWait(false);
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("doalogin");
          navigate("/doalogin");
        }
        console.error("Error occurred while fetching7", error);
        // "Records are not fetching."
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          NotificationManager.error(`${error.response.data.error}`);
        } else {
          NotificationManager.error(
            `Error fetching Data !! Contact Administrator `
          );
        }

      }

      setWait(false);
    }
    console.log("default4");
  };

  return (
    <>
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <table style={{ width: 900 }} align="left" className="style1">
            <tbody>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={6} style={{ fontSize: "large", fontWeight: 700 }}>
                  Report Screen
                </td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    href={excelURL || "#"}
                    download={downloadFileName}
                    onClick={(e) => {
                      e.preventDefault();
                      generateExcel(1, false);
                    }}
                  >
                    Today's Report
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(2, false)}
                  >
                    Yesterday's Report
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(4, false)}
                  >
                    HOLD Report
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(8, false)}
                  >
                    3 Days Ago Report
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td colSpan={2}>
                  <a>HOLD PO# Report</a>
                </td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(7, false)}
                  >
                    Tomorrow's Report
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td colSpan={2}>
                  <a>Yesterday Holds Report</a>
                </td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(5, false)}
                  >
                    Download Users
                  </a>
                </td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(6, false)}
                  >
                    Download Locations
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(3, false)}
                  >
                    All records 30 days
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>
                  <a>All records 45 days</a>
                </td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(9, false)}
                  >
                    All records 60 days
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(10, false)}
                  >
                    All records 90 days
                  </a>
                </td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>
                  <a>PO records 7 days</a>
                </td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>
                  <a>PO records 90 days</a>
                </td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>
                  <a>PO records 150 days</a>
                </td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td colSpan={2}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(11, false)}
                  >
                    All records 180 days
                  </a>
                </td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px" }}>
                <td style={{ width: 180 }}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => generateExcel(12, false)}
                  >
                    All records 365 days
                  </a>
                </td>
                <td style={{ width: 180 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ width: 150 }}>&nbsp;</td>
              </tr>
              <tr style={{ lineHeight: "30px", textAlign: "center" }}>
                {/* <td colSpan={2}>&nbsp;</td> */}
                <td colSpan={5}>
                  <a
                    style={{ color: "#0079F4" }}
                    onClick={() => {
                      navigate("/doa");
                    }}
                  >
                    Return to Administration Home Page
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DOAReports;
