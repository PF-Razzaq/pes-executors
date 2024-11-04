import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import MaterialTable from "material-table";

import { NotificationManager } from "react-notifications";
import { ThemeProvider, createTheme } from "@mui/material";
const fspColumns = [

  { 
    title: "FSPID", 
    field: "fspid", 
    // type: "numeric", 
    editable: "never",
    cellStyle: { width: 100},
    render: rowData => (
      <div style={{ width:100, border:"none", overflow: 'hidden', textOverflow: 'ellipsis' }}>

        {rowData.fspid}
      </div>
    ),
  },

  { 
    title: "Status", 
    field: "status", 
    // validate: (rowData) => rowData.status !== "",
    cellStyle: { width: 10 }, // Set column width
    render: rowData => (
      <div style={{ width: 10, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {rowData.status}
      </div>
    ),
    

  },
  {
    title: "First Name",
    field: "f_first",
    cellStyle: { width: 150 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 150, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.f_first}
      </div>
    ),
  },
  {
    title: "Last Name",
    field: "f_last",
    cellStyle: { width: 150 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 150, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.f_last}
      </div>
    ),
  },
  {
    title: "Phone",
    field: "fspphone",
    cellStyle: { width: 180 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 180, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.fspphone}
      </div>
    ),
  },
  {
    title: "Email",
    field: "fspemail",
    cellStyle: { width: 180 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 180, overflow: "auto", whiteSpace: "nowrap" }}>
        {rowData.fspemail}
      </div>
    ),
  },
  {
    title: "Username",
    field: "username",
    cellStyle: { width: 150 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 150, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.username}
      </div>
    ),
  },
  {
    title: "Password",
    field: "password",
    cellStyle: { width: 150 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 150, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.password}
      </div>
    ),
  },
  {
    title: "Job Title",
    field: "jobtitle",
    cellStyle: { width: 150 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 150, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.jobtitle}
      </div>
    ),
  },
  {
    title: "Old ID",
    field: "oldid",
    cellStyle: { width: 100 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 100, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.oldid}
      </div>
    ),
  },
  {
    title: "Date Added",
    field: "fspdateadded",
    type: "datetime",
    cellStyle: { width: 240 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 240, overflow: "auto", whiteSpace: "nowrap" }}>
        {rowData.fspdateadded}
      </div>
    ),
  },
  {
    title: "Last Accessed",
    field: "lastaccessed",
    type: "datetime",
    cellStyle: { width: 240 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 240, overflow: "auto", whiteSpace: "nowrap" }}>
        {rowData.lastaccessed}
      </div>
    ),
  },
  {
    title: "Login Count",
    field: "logincount",
    type: "numeric",

    cellStyle: { width: 100, Padding:'4px' }, // Set column width
    render: rowData => (
      <div style={{ width: 100, overflow: 'hidden', textOverflow: 'ellipsis', }}>

        {rowData.logincount}
      </div>
    ),
  },
  {
    title: "Language ID",
    field: "languageid",
    cellStyle: { width: 120 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 120, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.languageid}
      </div>
    ),
  },
  {
    title: "Routing ID",
    field: "routingid",
    cellStyle: { width: 50 }, // Set column width

    render: rowData => (
      <div style={{ width: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>

        {rowData.routingid}
      </div>
    ),
  },
  // {
  //   title: "PWD",
  //   field: "pwd",
  //   cellStyle: { width: 200 }, // Set column width
  //   render: rowData => (
  //     <div style={{ width: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
  //       {rowData.pwd}
  //     </div>
  //   ),
  // },
  {
    title: "Location ID",
    field: "locationid",
    type: "numeric",
    cellStyle: { width: 100 }, // Set column width
    render: (rowData) => (
      <div style={{ width: 100, overflow: "hidden", textOverflow: "ellipsis" }}>
        {rowData.locationid}
      </div>
    ),
  },
];

const locationColumns = [
  {
    title: "Location ID",
    field: "locationid",
    type: "numeric",
    editable: "never",
  },
  { title: "Status", field: "status", type: "boolean" },
  { title: "Location Name", field: "locationname" },
  { title: "Parent Company", field: "parentcompany" },
  { title: "Address", field: "address" },
  { title: "City", field: "city" },
  { title: "Province", field: "prov" },
  { title: "Postal Code", field: "postalcode" },
  { title: "Country", field: "country" },
  { title: "Phone", field: "phone" },
  { title: "Fax", field: "fax" },
  { title: "Admin Email", field: "adminemail" },
  { title: "Custom URL", field: "customurl" },
  { title: "Management Email", field: "managementemail" },
  { title: "Billing Code", field: "billingcode" },
  { title: "Old Location", field: "oldlocation" },
  { title: "Service Name", field: "servicename" },
  { title: "Billing Notes", field: "billingnotes" },
  { title: "Billing Email", field: "billingemail" },
  { title: "Misc Notes", field: "miscnotes" },
  { title: "Website", field: "website" },
  { title: "Logo Small", field: "logosmall" },
  { title: "Logo Large", field: "logolarge" },
  { title: "Date Added", field: "dateadded", type: "datetime" },
];
function AdminUsers() {
  const defaultMaterialTheme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "4px", // Reduce the row height
          },
        },
      },
    },
  });
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationId, setLocationId] = useState("");
  const [locationTable, setLocationTable] = useState([]);
  const [fspTable, setFspTable] = useState([]);
  const [isNewLocation, setIsNewLocation] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("doalogin") &&
      localStorage.getItem("doalogin") == "i89j2y2"
    ) {
    } else {
      navigate("/doalogin");
    }
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getlocations/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("jpd")}`,
        },
      })
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("doalogin");
          navigate("/doalogin");
        }
      });
  }, []);

  const handleLocationSelect = (e) => {
    let locationName = "";
    if (locations.filter((a) => a.LocationID == e.target.value).length !== 0) {
      locationName = locations.filter((a) => a.LocationID == e.target.value)[0]
        .LocationName;
    }
    setLocationId(e.target.value);
    if (e.target.value === "NEW") {
      setIsNewLocation(true);
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/get_data_from_location/New`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("jpd")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.length !== 0) {
            setLocationTable(response.data);
          } else {
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/api/locations/`,
                {
                  locationname: "New",
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("jpd")}`,
                  },
                }
              )
              .then((response) => {
                setLocationTable([response.data]);
              })
              .catch((error) => {
                if (error.response && error.response.status === 403) {
                  localStorage.removeItem("doalogin");
                  navigate("/doalogin");
                }
              });
          }
        });
    } else {
      setIsNewLocation(false);
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/get_fsps_by_locationid/${e.target.value}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("jpd")}`,
            },
          }
        )
        .then((response) => {
          setFspTable(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            localStorage.removeItem("doalogin");
            navigate("/doalogin");
          }

          if (error.response.status === 404) {
            NotificationManager.error("fsp user not found");
            return;
          }
          NotificationManager.error("fsp fetch unsuccessfull!!");
          console.error("!", error);
        });
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/locations/${e.target.value}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("jpd")}`,
            },
          }
        )
        .then((response) => {
          setLocationTable([response.data]);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            localStorage.removeItem("doalogin");
            navigate("/doalogin");
          }
          NotificationManager.error("Location fetch unsuccessfull!!");
          console.error("!", error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewLocation) {
      axios.post("/api/locations", locationTable).then(() => {
        alert("Location created successfully");
      });
    } else {
      axios
        .put(`/api/locations/${selectedLocation.LocationID}`, locationTable)
        .then(() => {
          alert("Location updated successfully");
        });
    }
  };

  return (
    <div>
      <h1>Admin Users and Locations</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={handleLocationSelect}>
          <option value="">Select Location</option>
          <option value="NEW">------NEW------</option>
          {locations.map((location) => (
            <option
              key={location.LocationID}
              name={location.LocationName}
              value={location.LocationID}
            >
              {location.LocationName} ({location.City})
            </option>
          ))}
        </select>
        {locationTable.length !== 0 && (
          <>
            {" "}
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                title="Location Results"
                columns={locationColumns}
                data={locationTable}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const updatedData = [...locationTable];
                        const index = oldData.tableData.id;
                        updatedData[index] = newData;

                        axios
                          .put(
                            `${process.env.REACT_APP_BACKEND_URL}/api/locations/${newData.locationid}/`,
                            newData,
                            {
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${localStorage.getItem(
                                  "jpd"
                                )}`,
                              },
                            }
                          )
                          .then(() => {
                            setLocationTable(updatedData);
                            NotificationManager.success(
                              "Location updated successfully"
                            );
                          })
                          .catch((error) => {
                            NotificationManager.error(
                              "Location update unsuccessfull!!"
                            );
                            console.error(
                              "There was an error updating the location!",
                              error
                            );
                          });

                        resolve();
                      }, 600);
                    }),
                  //  onRowDelete: oldData =>
                  //    new Promise((resolve, reject) => {
                  //      setTimeout(() => {
                  //        const updatedData = [...locationTable];
                  //        const index = oldData.tableData.id;
                  //        updatedData.splice(index, 1);
                  //        setLocationTable(updatedData);
                  //        resolve();
                  //      }, 600);
                  //    }),
                }}
                options={{
                  search: false,
                  sorting: false,
                  paging: false,
                  actionsColumnIndex: 0,
                  maxBodyHeight: "23vh",
                }}
              />
            </ThemeProvider>
          </>
        )}
        <br />

        {fspTable.length !== 0 && (
          <>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                title="FSP Results"
                columns={fspColumns}
                data={fspTable}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        newData.locationid = locationId;

                        if (!newData.username) {
                          NotificationManager.info("username is required");
                          resolve();
                          return;
                        }
                        if (!newData.password) {
                          NotificationManager.info(" password  is required");
                          resolve();
                          return;
                        }
                        if (!newData.status) {
                          NotificationManager.info(" status is required");
                          resolve();
                          return;
                        }

                        axios
                          .post(
                            `${process.env.REACT_APP_BACKEND_URL}/api/fsps_list1/`,
                            newData,
                            {
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${localStorage.getItem(
                                  "jpd"
                                )}`,
                              },
                            }
                          )
                          .then(() => {
                            setFspTable([...fspTable, newData]);
                            NotificationManager.success(
                              "entry added successfully"
                            );
                          })
                          .catch((error) => {
                            NotificationManager.error(
                              "entry addition unsuccessfull!!"
                            );
                            console.error(
                              "There was an error updating the location!",
                              error
                            );
                          });
                        resolve();
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const updatedData = [...fspTable];
                        const index = oldData.tableData.id;
                        updatedData[index] = newData;

                        axios
                          .put(
                            `${process.env.REACT_APP_BACKEND_URL}/api/fsps_detail/${newData.fspid}/`,
                            newData,
                            {
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${localStorage.getItem(
                                  "jpd"
                                )}`,
                              },
                            }
                          )
                          .then(() => {
                            setFspTable(updatedData);
                            NotificationManager.success(
                              "fsp table updated successfully"
                            );
                          })
                          .catch((error) => {
                            NotificationManager.error(
                              "fsp table update unsuccessfull!!"
                            );
                            console.error(
                              "There was an error updating the location!",
                              error
                            );
                          });
                        resolve();
                      }, 600);
                    }),
                }}
                options={{
                  search: false,
                  sorting: false,
                  paging: false,
                  actionsColumnIndex: 0,

                  maxBodyHeight: "36vh",

                }}
              />
            </ThemeProvider>
          </>
        )}
      </form>
    </div>
  );
}

export default AdminUsers;
