import "../PagesCss/Default.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import englishLabels from "../json/PesdataEnglish.json";
import ImageContainer from "./ImageContainer";
import { NotificationManager } from "react-notifications";
import { Auth_Instance } from "../services/axiosservices";
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
const userData = JSON.parse(localStorage.getItem("userData"));
const EditPesdata = () => {
  const postalRef = useRef(null);
  const dayRef = useRef(null);
  const { eventID } = useParams();
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  }

  function calculateAge(dob, dod) {
    const birthDate = dob;
    const deathDate = dod;

    // Calculate the basic difference in years
    let age = deathDate.getFullYear() - birthDate.getFullYear() - 1;

    // Extract the months and days
    const deathMonth = deathDate.getMonth() + 1; // Months are 0-indexed in JS
    const birthMonth = birthDate.getMonth() + 1;
    const deathDay = deathDate.getDate();
    const birthDay = birthDate.getDate();

    // Compare months
    if (deathMonth > birthMonth) {
      age++; // If death month is greater than birth month, add 1 year
    } else if (deathMonth === birthMonth) {
      // If months are the same, compare days
      if (deathDay >= birthDay) {
        age++; // If the death day is the same or later, add 1 year
      }
    }

    return age;
  }

  const validatefield = (sin) => {
    const sinRegex = /^\d+$/; // Regex to match one or more digits
    return sinRegex.test(sin);
  };
  const [country, setCountry] = useState([]);

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [labels, setLabels] = useState({});
  // function formatNineDigitString(str) {
  //   // Ensure the string is 9 digits long
  //   if (str.length !== 9 || !/^\d{9}$/.test(str)) {
  //     throw new Error("Input must be a 9-digit string.");
  //   }

  //   // Insert spaces after every 3 digits
  //   return str.replace(/(\d{3})(?=\d)/g, "$1 ");
  // }
  const [formData, setFormData] = useState({
    FSPID: "",
    d_First: "",
    d_middle_a: "",
    d_middle_b: "",
    d_Last: "",
    d_Maiden: "",
    d_Address: "",
    d_Unit: "",
    d_City: "",
    d_Prov: "",
    d_Postal: "",
    d_Country: "",
    e_Country: "",
    d_AreaCode: "",
    d_exchange: "",
    d_phone: "",
    d_DOB: "",
    d_birth_Country: "",
    d_birth_City: "",
    d_birth_Prov: "",
    d_DOD: "",
    d_death_Country: "",
    d_death_City: "",
    d_death_Prov: "",
    d_death_age: "",
    d_dispdate: "",
    d_disp_Name: "",
    d_SIN: "",
    e_Salutation: "",
    e_First: "",
    e_Initial: "",
    e_Last: "",
    e_Address: "",
    e_Unit: "",
    e_City: "",
    e_Prov: "",
    e_Postal: "",
    e_AreaCode: "",
    e_exchange: "",
    e_phone_4: "",
    e_relationship: "",
    d_Day: "",
    d_Month: "",
    d_Year: "",

    d_DeathDay: "",
    d_DeathMonth: "",
    d_DeathYear: "",

    d_dispDeathDay: "",
    d_dispDeathMonth: "",
    d_dispDeathYear: "",
  });

  const monthRef = useRef(null); // Reference for the Month select input
  const yearRef = useRef(null); // Reference for the Year input

  const deathmonthRef = useRef(null);
  const deathyearRef = useRef(null);

  const disposmonthRef = useRef(null);
  const dispyearRef = useRef(null);

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
  const handleChange = (e) => {
    console.log("Target", e.target.value, e.target.id, formData);
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,

      [id]: value,
    }));
    if (id == "d_AreaCode" && value.length == 3) {
      document.getElementById("d_exchange").focus();
    }
    if (id == "d_exchange" && value.length == 3) {
      document.getElementById("d_phone").focus();
    }
    if (id == "d_phone" && value.length == 4) {
      document.getElementById("d_Day").focus();
    }
    if (id == "e_AreaCode" && value.length == 3) {
      document.getElementById("e_exchange").focus();
    }
    if (id == "e_exchange" && value.length == 3) {
      document.getElementById("e_phone_4").focus();
    }

    if (id === "d_Day") {
      // Focus on the Month select input when the Day input is changed
      monthRef.current.focus();
    } else if (id === "d_Month") {
      // Focus on the Year input when the Month input is changed
      yearRef.current.focus();
    } else if (id === "d_DeathDay") {
      deathmonthRef.current.focus();
      console.log("deathmonthRef", deathmonthRef);
    } else if (id === "d_DeathMonth") {
      deathyearRef.current.focus();
    }
    if (id === "d_dispDeathDay") {
      disposmonthRef.current.focus();
    } else if (id === "d_dispDeathMonth") {
      dispyearRef.current.focus();
    }
  };

  useEffect(() => {
    console.log("Run");
    getCountgries();
    const fetchData = async () => {
      try {
        const response = await Auth_Instance.get(`/api/events/${eventID}`);
        console.log("eventID", eventID);
        console.log("API EditPES Response:", response.data);

        const EditPESData = response.data;
        console.log("EditPes Data:", EditPESData);

        if (EditPESData) {
          const d_DOB_parts = EditPESData.d_DOB
            ? EditPESData.d_DOB.split("/")
            : ["", "", ""];
          const d_DOD_parts = EditPESData.d_DOD
            ? EditPESData.d_DOD.split("/")
            : ["", "", ""];
          const d_dispdate_parts = EditPESData.d_dispdate
            ? EditPESData.d_dispdate.split("/")
            : ["", "", ""];

          const formatPart = (part) =>
            part && part.startsWith("0") ? part.substring(1) : part || "";

          const obj = { eventID: response.data.eventID };
          localStorage.setItem("eventID", JSON.stringify(obj));
          let td_Prov, td_birth_Prov, td_death_Prov, te_Prov;
          if (EditPESData.d_Prov === "") {
            td_Prov = "blankField";
          } else {
            td_Prov = EditPESData.d_Prov;
          }
          if (EditPESData.d_birth_Prov === "") {
            td_birth_Prov = "blankField";
          } else {
            td_birth_Prov = EditPESData.d_birth_Prov;
          }
          if (EditPESData.d_death_Prov === "") {
            td_death_Prov = "blankField";
          } else {
            td_death_Prov = EditPESData.d_death_Prov;
          }
          if (EditPESData.e_Prov === "") {
            te_Prov = "blankField";
          } else {
            te_Prov = EditPESData.e_Prov;
          }
          setFormData({
            ...EditPESData,
            d_Prov: td_Prov,
            d_birth_Prov: td_birth_Prov,
            d_death_Prov: td_death_Prov,
            e_Prov: te_Prov,
            d_Day: formatPart(d_DOB_parts[0]),
            d_Month: formatPart(d_DOB_parts[1]),
            d_Year: d_DOB_parts[2] || "",
            d_DeathDay: formatPart(d_DOD_parts[0]),
            d_DeathMonth: formatPart(d_DOD_parts[1]),
            d_DeathYear: d_DOD_parts[2] || "",
            d_dispDeathDay: formatPart(d_dispdate_parts[0]),
            d_dispDeathMonth: formatPart(d_dispdate_parts[1]),
            d_dispDeathYear: d_dispdate_parts[2] || "",
            d_SIN: response.data.d_SIN,
          });

          delete response.data.eventID;
          delete response.data.OLDdID;
          delete response.data.FSPID;
          delete response.data.eventdate;
          delete response.data.d_PHC;
          delete response.data.d_Prov_PHC;
          delete response.data.d_BCN;

          function convertPropertiesToString(obj) {
            const newObj = {};

            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                newObj[key] = String(obj[key]);
              }
            }

            return newObj;
          }

          const stringObject = convertPropertiesToString(response.data);
          localStorage.setItem(
            "createEventResponse",
            JSON.stringify(stringObject)
          );
        } else {
          console.error("Invalid response or empty data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [eventID]);

  useEffect(() => {
    // Fetch FSPID from local storage and set it in the form data

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

  // function containsOnlyDigits(str) {
  //   return /^\d+$/.test(str);
  // }
  function removeSpacesAndDashes(str) {
    return str.replace(/[\s-]/g, "");
  }
  const formattedDate = (d_Day, d_Month, d_Year) => {
    const monthIndex = parseInt(d_Month) - 1;
    const date = new Date(d_Year, monthIndex, d_Day);
    const monthName = monthNames[date.getMonth()];
    const formattedDate = `${monthName} ${date.getDate()} ${date.getFullYear()} 12:00AM`;
    return formattedDate;
  };
  const parseDateString = (dateString) => {
    const [monthAbbr, day, yearAndTime] = dateString.split(" ");
    const [year, time] = yearAndTime.split(" ");
    const month = monthNames.indexOf(monthAbbr) + 1;
    return {
      d_Day: day,
      d_Month: month.toString(),
      d_Year: year,
    };
  };
  const isDateGreaterThanCurrent = (inputDate) => {
    const currentDate = new Date();
    const [day, month, year] = inputDate.split("/");
    const formattedInputDate = new Date(`${year}-${month}-${day}`);
    console.log(
      "inputDate,formattedInputDate,currentDate,formattedInputDate > currentDate",
      inputDate,
      formattedInputDate,
      currentDate,
      formattedInputDate > currentDate
    );
    return formattedInputDate > currentDate;
  };
  // Example usage
  const [requesting, setRequesting] = useState(false);
  const isValidDate = (dateString) => {
    console.log("dateString", dateString);

    // Check format with regex that allows one or two digits for day and month
    const regex =
      /^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    // Split the date parts
    const [day, month, year] = dateString.split("/").map(Number);

    // Create a date object and check if the components match
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };
  const handleSubmit = async () => {
    const { d_Day, d_Month, d_Year } = parseDateString(
      formattedDate(formData.d_Day, formData.d_Month, formData.d_Year)
    );

    if (formData.d_Prov === "blankField") {
      formData.d_Prov = "";
    }
    if (formData.d_birth_Prov === "blankField") {
      formData.d_birth_Prov = "";
    }
    if (formData.d_death_Prov === "blankField") {
      formData.d_death_Prov = "";
    }
    if (formData.e_Prov === "blankField") {
      formData.e_Prov = "";
    }

    formData["d_SIN"] = removeSpacesAndDashes(formData["d_SIN"]);
    const sinLength = formData["d_SIN"].length;
    if (sinLength < 9 || sinLength > 9) {
      if (labels.selectedLanguage === "en") {
        NotificationManager.error(
          "SIN numbers must be exactly 9 digits long. Please indicate a valid SIN number.",
          "Error"
        );
      }
      if (labels.selectedLanguage === "fr") {
        NotificationManager.error(
          "Les numéros de NAS doivent comporter exactement 9 chiffres. Veuillez entrer un numéro de NAS valide.",
          "Erreur"
        );
      }
      document.getElementById("d_SIN").focus();
      return;
    }

    if (formData["d_SIN"] != "111111111" && !luhn(getSin(formData["d_SIN"]))) {
      if (labels.selectedLanguage === "en") {
        NotificationManager.error(
          "Please indicate a valid SIN number. SIN numbers are 9 digits and match a formula. The SIN as entered does not match a possible SIN. If the number is unknown, enter 111 111 111 - only if absolutely necessary.",
          ""
        );
      }
      if (labels.selectedLanguage === "fr") {
        NotificationManager.error(
          "Le NAS sur les formulaires doit être formaté sous la forme 3 chiffres espace 3 chiffres espace 3 chiffres par exemple 111 222 333.",
          "Erreur de validation"
        );
      }
      document.getElementById("d_SIN").focus();
      return;
    }

    // if (!validatefield(formData.e_AreaCode)) {
    //   if (labels.selectedLanguage === "en") {
    //     NotificationManager.error("Executor Area Code Must Be  Numeric", "");
    //   }
    //   if (labels.selectedLanguage === "fr") {
    //     NotificationManager.error(
    //       "   L'indicatif régional de l'exécuteur doit être numérique",
    //       ""
    //     );
    //   }
    //   return; // Stop the function if validation fails
    // }
    // if (!validatefield(formData.e_exchange)) {
    //   if (labels.selectedLanguage === "en") {
    //     NotificationManager.error("Executor Exchange Must Be  Numeric", "");
    //   }
    //   if (labels.selectedLanguage === "fr") {
    //     NotificationManager.error(
    //       "L'échange de l'exécuteur doit être numérique",
    //       ""
    //     );
    //   }
    //   return; // Stop the function if validation fails
    // }
    // if (!validatefield(formData.e_phone_4)) {
    //   if (labels.selectedLanguage === "en") {
    //     NotificationManager.error("Executor Phone Must Be  Numeric", "");
    //   }
    //   if (labels.selectedLanguage === "fr") {
    //     NotificationManager.error(
    //       "Le téléphone de l’exécuteur doit être numérique",
    //       ""
    //     );
    //   }
    //   return; // Stop the function if validation fails
    // }

    if (formData.d_DeathYear.length < 4) {
      if (labels.selectedLanguage === "en" && userData.RoutingID == 200) {
        NotificationManager.error("Death Year has wrong format", "");
        document.getElementById("d_DeathYear").focus();
        return;
      }
    }

    const formattedDOB = `${formData.d_Day}/${String(formData.d_Month).padStart(
      2,
      "0"
    )}/${String(formData.d_Year).padStart(2, "0")}`;

    const formattedDOD = `${formData.d_DeathDay}/${String(
      formData.d_DeathMonth
    ).padStart(2, "0")}/${String(formData.d_DeathYear).padStart(2, "0")}`;

    const formattedDispDOD = `${formData.d_dispDeathDay}/${String(
      formData.d_dispDeathMonth
    ).padStart(2, "0")}/${String(formData.d_dispDeathYear).padStart(2, "0")}`;

    const dateOfBirth = new Date(
      formData.d_Year,
      formData.d_Month - 1,
      formData.d_Day
    );
    const dateOfDeath1 = new Date(
      formData.d_DeathYear,
      formData.d_DeathMonth - 1,
      formData.d_DeathDay
    );
    const dateOfDisposition = new Date(
      formData.d_dispDeathYear,
      formData.d_dispDeathMonth - 1,
      formData.d_dispDeathDay
    );

    if (dateOfDeath1 < dateOfBirth) {
      let errorMessage = "";
      if (labels.selectedLanguage === "en") {
        errorMessage = `Date of Death ${formattedDOD} must be after Date of Birth ${formattedDOB}.`;
      } else if (labels.selectedLanguage === "fr") {
        errorMessage = `La date ${formattedDOD} du décès doit être postérieure à la date de naissance ${formattedDOB}.`;
      }
      NotificationManager.error(errorMessage, "");
      document.getElementById("d_death_age").focus();
      return;
    }

    if (userData.RoutingID == 200) {
      if (
        formData.d_dispDeathYear != "" ||
        formData.d_dispDeathMonth != "" ||
        formData.d_dispDeathDay != ""
      ) {
        if (formData.d_dispDeathYear.length < 4) {
          if (labels.selectedLanguage === "en" && userData.RoutingID == 200) {
            NotificationManager.error("Disposition Year has wrong format ", "");
            document.getElementById("d_dispDeathYear").focus();
            return;
          }
        }

        if (dateOfDisposition < dateOfDeath1) {
          let errorMessage = "";
          if (labels.selectedLanguage === "en") {
            errorMessage = `Disposition Date ${formattedDispDOD} must be after Date of Death ${formattedDOD}.`;
          } else if (labels.selectedLanguage === "fr") {
            errorMessage = `L’année de la ${formattedDispDOD} décision doit être postérieure à la date du décès ${formattedDOD}.`;
          }

          NotificationManager.error(errorMessage, "");
          document.getElementById("d_dispDeathYear").focus();
          return; // Stop the function if validation fails
        }
      }
    }
    if (!isValidDate(formattedDOB)) {
      NotificationManager.error("Date of birth is invalid!!", "");
      return;
    }
    if (!isValidDate(formattedDOD)) {
      NotificationManager.error("Date of death is invalid!!", "");
      return;
    }
    if (formattedDispDOD.length > 8 && !isValidDate(formattedDispDOD)) {
      NotificationManager.error("Date of Disposition is invalid!!", "");
      return;
    }
    const calculatedAge = calculateAge(dateOfBirth, dateOfDeath1);
    const deathage = Number(formData.d_death_age);
    if (deathage !== calculatedAge) {
      let errorMessage = "";
      if (labels.selectedLanguage === "en") {
        errorMessage = `The age you entered (${formData.d_death_age} years) does not match the calculated age (${calculatedAge} years). Please verify your entries for birth, death, and age.`;
      } else if (labels.selectedLanguage === "fr") {
        errorMessage = `L’âge que vous avez entré (${formData.d_death_age} years) ne correspond pas à l’âge calculé (${calculatedAge} years). Veuillez vérifier vos données de naissance, de décès et d’âge.`;
      }
      NotificationManager.error(errorMessage);
      document.getElementById("d_death_age").focus();
      return;
    }

    // if (formData.e_phone_4.length < 4) {
    //   if (labels.selectedLanguage === "en") {
    //     NotificationManager.error("Executor Phone number must be 4 digits", "");
    //   }
    //   if (labels.selectedLanguage === "fr") {
    //     NotificationManager.error(
    //       "Le numéro de téléphone de l’exécuteur doit être composé de 4 chiffres",
    //       ""
    //     );
    //   }
    //   return; // Stop the function if validation fails
    // }

    // if (formData.e_AreaCode.length < 3) {
    //   console.log("e_AreaCode", formData.e_AreaCode.length);
    //   if (labels.selectedLanguage === "en") {
    //     NotificationManager.error(
    //       "Area Code must be exactly 3 digits long",
    //       ""
    //     );
    //   }
    //   if (labels.selectedLanguage === "fr") {
    //     NotificationManager.error(
    //       "L'indicatif régional doit comporter exactement 3 chiffres",
    //       ""
    //     );
    //   }
    //   return;
    // }

    // if (formData.e_exchange.length < 3) {
    //   if (labels.selectedLanguage === "en") {
    //     NotificationManager.error(
    //       "Exchange Code must be exactly 3 digits long",
    //       ""
    //     );
    //   }
    //   if (labels.selectedLanguage === "fr") {
    //     NotificationManager.error(
    //       "Le code d'échange doit comporter exactement 3 chiffres",
    //       ""
    //     );
    //   }
    //   return;
    // }

    // if (formData.e_phone_4.length < 4) {
    //   if (labels.selectedLanguage === "en") {
    //     NotificationManager.error("Phone must be exactly 4 digits long", "");
    //   }
    //   if (labels.selectedLanguage === "fr") {
    //     NotificationManager.error(
    //       "Le téléphone doit comporter exactement 4 chiffres",
    //       ""
    //     );
    //   }
    //   return;
    // }

    const fullFormData = {
      ...formData,
      d_DOB: formattedDOB,
      d_DOD: formattedDOD,
      d_dispdate: formattedDispDOD,
    };
    if (isDateGreaterThanCurrent(formattedDOD)) {
      if (labels.selectedLanguage === "en") {
        NotificationManager.error("Date of Death cannot be in future.");
      } else if (labels.selectedLanguage === "fr") {
        NotificationManager.error(
          "L’année du Décès ne peut pas être dans le futur."
        );
      }
      document.getElementById("d_DeathYear").focus();
      return;
    }
    if (userData.RoutingID == 104) {
      console.log("in 104");
      delete fullFormData.d_dispdate;
    }
    setRequesting(true);
    try {
      const response = await Auth_Instance.put(
        `/api/event_modify/`,
        fullFormData
      );
      console.log("🚀 ~ handleSubmit ~ response:", response);
      setRequesting(false);
      NotificationManager.success("Data Updated successfully", "Success");
      console.log("🚀 ~ handleSubmit ~ response:", response.data);

      delete formData.eventID;
      delete formData.OLDdID;
      delete formData.FSPID;
      delete formData.eventdate;
      delete formData.d_PHC;
      delete formData.d_Prov_PHC;
      delete formData.d_BCN;

      function convertPropertiesToString(obj) {
        const newObj = {};

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] = String(obj[key]);
          }
        }

        return newObj;
      }
      setFormData("");
      const stringObject = convertPropertiesToString(formData);
      localStorage.setItem("createEventResponse", JSON.stringify(stringObject));
      window.scrollTo(0, 0);
      navigate("/executorPrint");
    } catch (error) {
      setRequesting(false);
      console.error("Error submitting data:", error);
      NotificationManager.error("Error", "Error");
    }
  };
  function getSin(sinStr) {
    var values = new Array();

    for (let i = 0; i < 3; ++i) {
      values[i] = parseInt(sinStr.charAt(i));
      values[i + 3] = parseInt(sinStr.charAt(i + 3));
      values[i + 6] = parseInt(sinStr.charAt(i + 6));
    }
    return values;
  }
  function luhn(input) {
    const number = input.toString();
    const digits = number.replace(/\D/g, "").split("").map(Number);
    console.log(digits);
    let sum = 0;
    let isSecond = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (isSecond) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isSecond = !isSecond;
    }
    return sum % 10 === 0;
  }
  // function validateSIN(sin) {
  //   const sinPattern = /^\d{3} \d{3} \d{3}$/;
  //   return sinPattern.test(sin);
  // }

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <main>
            {/* <div id="google_translate_element"></div> */}
            <div className="container-xl px-4 mt-4">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card mb-4">
                    <ImageContainer
                      selectedLanguage={labels.selectedLanguage}
                    />
                    {/* <div className="card-body">
                      {labels.selectedLanguage === "fr" && (
                        <div className="newUser">
                          <p> Télécharger un contrat client vide</p>
                          <p> Formulaire de renonciation au service</p>
                          <p> Download Blank Client Agreement</p>
                          <p>Download Waiver Form</p>
                        </div>
                      )}
                      <hr></hr>
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        {labels["4"]}{" "}
                        <a
                          href="mailto:cdnsubmit@progressiveestatesolutions.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          cdnsubmit@progressiveestatesolutions.com
                        </a>
                      </p>
                      <hr></hr>
                      {labels.selectedLanguage === "en" && (
                        <>
                          <a
                            href="/Blank CA 2023.pdf"
                            style={{ color: "#0079F4", cursor: "pointer" }}
                          >
                            {labels["5"]}
                          </a>
                          <hr></hr>{" "}
                        </>
                      )}
                      <p>
                        {" "}
                        <a
                          style={{ marginLeft: "15%" }}
                          class="stylish-button"
                          href="executorModifyRecord"
                        >
                          {labels["6"]}
                        </a>
                        <a
                          style={{ marginLeft: "15%" }}
                          class="stylish-button"
                          href="/aftercare"
                        >
                          {labels["7"]}
                        </a>
                      </p>
                      <hr></hr>
                      <p style={{ color: "#0079F4" }} className="pleaseCall">
                        {" "}
                        {labels["8"]}
                      </p>
                    </div> */}
                    <div className="card-header">{labels["9"]}</div>
                    <div className="card-body">
                      <div className="row gx-3 mb-1">
                        {/* input hidden */}

                        <div className="col-md-6">
                          <input
                            className="form-control new-style-input"
                            id="FSPID"
                            type="text"
                            value={formData.FSPID}
                            style={{ display: "none" }}
                            readOnly // Make it read-only
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["10"]}{" "}
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
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
                            className="form-control new-style-input"
                            id="d_middle_a"
                            type="text"
                            value={formData.d_middle_a}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["12"]}&nbsp;
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_middle_b"
                            type="text"
                            value={formData.d_middle_b}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["13"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_Last"
                            type="text"
                            //   placeholder="Enter Last Name"
                            value={formData.d_Last}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-1">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["14"]}:&nbsp;
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_Maiden"
                            type="text"
                            value={formData.d_Maiden}
                            onChange={handleChange}
                          />
                        </div>{" "}
                      </div>

                      <div className="row gx-3 mb-1">
                        <div className="col-md-6">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["15"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_Address"
                            type="text"
                            //   placeholder="Enter Street Address"
                            value={formData.d_Address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["16"]}:&nbsp;
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_Unit"
                            type="text"
                            //   placeholder="Enter Unit/Suite"
                            value={formData.d_Unit}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["17"]}{" "}
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_City"
                            type="text"
                            //   placeholder="Enter City/Town"
                            value={formData.d_City}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["18"]}&nbsp;{" "}
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="d_Prov"
                            value={formData.d_Prov}
                            onChange={handleChange}
                          >
                            <option disabled value="">
                              {labels["19"]}:
                            </option>
                            <option value=" "> &nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="AB">{labels["73"]}</option>
                            <option value="BC">{labels["74"]}</option>
                            <option value="MB">{labels["75"]}</option>
                            <option value="NB">{labels["76"]}</option>
                            <option value="NL">{labels["77"]}</option>
                            <option value="NS">{labels["78"]}</option>
                            <option value="NT">{labels["79"]}</option>
                            <option value="NU">{labels["80"]}</option>
                            <option value="ON">{labels["81"]}</option>
                            <option value="PE">{labels["82"]}</option>
                            <option value="QC">{labels["83"]}</option>
                            <option value="SK">{labels["84"]}</option>
                            <option value="YT">{labels["85"]}</option>
                          </select>
                        </div>

                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["20"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_Postal"
                            type="text"
                            value={formData.d_Postal}
                            onChange={handleChange}
                            //   placeholder="Enter Postal"
                            required
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        {/* Form Group (last name)*/}

                        <div className="col-md-4">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["40"]}&nbsp;
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="d_Country"
                            value={formData.d_Country}
                            onChange={handleChange}
                            defaultValue={formData.d_Country}
                          >
                            <option value=" "> &nbsp;&nbsp;&nbsp;&nbsp;</option>
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

                      {/* <div className="row gx-3 mb-1">
                     <>
                          <div className="col-md-4">
                            <label
                              className="small mb-1"
                              htmlFor="inputFirstName"
                            >
                              {labels["21"]}&nbsp;
                            </label>
                            <input

                              className="form-control new-style-input"

                              id="d_AreaCode"
                              type="text"
                              maxLength="3"
                              value={formData.d_AreaCode}
                              onChange={handleChange}
                              //   placeholder="Enter Area Code"
                              required
                            />
                          </div>

                          <div className="col-md-4">
                            <label
                              className="small mb-1"
                              htmlFor="inputFirstName"
                            >
                              {labels["22"]}&nbsp;
                            </label>
                            <input

                              className="form-control new-style-input"

                              id="d_exchange"
                              type="text"
                              maxLength="3"
                              value={formData.d_exchange}
                              onChange={handleChange}
                              //   placeholder="Enter Exchange"
                              required
                            />
                          </div>
                        </>

                        <div className="col-md-4">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["23"]}&nbsp;
                          </label>
                          <input

                            className="form-control new-style-input"

                            id="d_phone"
                            type="text"
                            maxLength="4"
                            value={formData.d_phone}
                            onChange={handleChange}
                            //   placeholder="Enter Phone No"
                            required
                          />
                        </div>
                      </div> */}

                      <div className="row gx-3 mb-1">
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["24"]} &nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <select
                            ref={dayRef}
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="d_Day"
                            value={formData.d_Day}
                            onChange={handleChange}
                            required
                          >
                            <option
                              style={{ fontSize: "16px" }}
                              disabled
                              value=""
                            >
                              {labels["25"]}:
                            </option>
                            {/* Generate days */}
                            {[...Array(31)].map((_, i) => (
                              <option
                                style={{ fontSize: "16px" }}
                                key={i + 1}
                                value={i + 1}
                              >
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Form Group (last name)*/}
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="d_Month">
                            {labels["26"]}
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            id="d_Month"
                            value={formData.d_Month}
                            onChange={handleChange}
                            ref={monthRef} // Assign the ref to the Month select input
                            required
                          >
                            <option
                              style={{ fontSize: "16px" }}
                              disabled
                              value=""
                            >
                              {labels["27"]}:
                            </option>
                            {/* Month options */}
                            {[
                              labels["87"],
                              labels["88"],
                              labels["89"],
                              labels["90"],
                              labels["91"],
                              labels["92"],
                              labels["93"],
                              labels["94"],
                              labels["95"],
                              labels["96"],
                              labels["97"],
                              labels["98"],
                            ].map((month, index) => (
                              <option
                                style={{ fontSize: "16px" }}
                                key={index}
                                value={index + 1}
                              >
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="d_Year">
                            {labels["28"]}
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_Year"
                            type="text"
                            maxLength="4"
                            pattern="^[0-9\b]+$"
                            value={formData.d_Year}
                            onChange={handleChange}
                            //   placeholder="Enter Year"
                            ref={yearRef} // Assign the ref to the Year input
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["51"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control  new-style-input"
                            id="d_SIN"
                            type="text"
                            maxLength="11"
                            value={formData.d_SIN}
                            onChange={handleChange}
                            required
                            //   placeholder="Enter Social Insurance Number "
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-1">
                        {/* Form Group (first name)*/}
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputLastName"
                            style={{ color: "#0061f2", fontWeight: 500 }}
                          >
                            {labels["29"]}&nbsp;
                          </label>
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        {/* Form Group (last name)*/}
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["31"]}&nbsp;
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_birth_City"
                            type="text"
                            value={formData.d_birth_City}
                            onChange={handleChange}

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["32"]}&nbsp;
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="d_birth_Prov"
                            value={formData.d_birth_Prov}
                            onChange={handleChange}
                          >
                            <option disabled value="">
                              {labels["33"]}:
                            </option>
                            <option value=" "> &nbsp;&nbsp;&nbsp;&nbsp;</option>

                            <option value="AB">{labels["73"]}</option>
                            <option value="BC">{labels["74"]}</option>
                            <option value="MB">{labels["75"]}</option>
                            <option value="NB">{labels["76"]}</option>
                            <option value="NL">{labels["77"]}</option>
                            <option value="NS">{labels["78"]}</option>
                            <option value="NT">{labels["79"]}</option>
                            <option value="NU">{labels["80"]}</option>
                            <option value="ON">{labels["81"]}</option>
                            <option value="PE">{labels["82"]}</option>
                            <option value="QC">{labels["83"]}</option>
                            <option value="SK">{labels["84"]}</option>
                            <option value="YT">{labels["85"]}</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["30"]}&nbsp;{" "}
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="d_birth_Country"
                            value={formData.d_birth_Country}
                            onChange={handleChange}
                            defaultValue={formData.d_birth_Country}
                          >
                            <option value=" "> &nbsp;&nbsp;&nbsp;&nbsp;</option>
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
                      <div className="row gx-3 mb-1">
                        {labels.selectedLanguage === "fr" && (
                          <div className="col-md-2">
                            <label
                              className="small mb-1"
                              htmlFor="inputLastName"
                            >
                              {labels["176"]}&nbsp;
                              <span style={{ color: "#FF0000" }}> *</span>
                            </label>
                            <input
                              className="form-control new-style-input"
                              id="d_DeathYear"
                              type="text"
                              maxLength="4"
                              pattern="^[0-9\b]+$"
                              // value={formData.d_DeathYear}
                              // onChange={handleChange}
                              // ref={deathyearRef}
                              //   placeholder="Enter Year"
                              required
                            />
                          </div>
                        )}
                        {/* Form Group (last name)*/}
                      </div>

                      <div className="row gx-3 mb-1">
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["34"]} &nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="d_DeathDay"
                            value={formData.d_DeathDay}
                            onChange={handleChange}
                            required
                          >
                            <option
                              style={{ fontSize: "16px" }}
                              disabled
                              value=""
                            >
                              {labels["35"]}:
                            </option>
                            {/* Generate days */}
                            {[...Array(31)].map((_, i) => (
                              <option
                                style={{ fontSize: "16px" }}
                                key={i + 1}
                                value={i + 1}
                              >
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Form Group (last name)*/}
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["36"]} &nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="d_DeathMonth"
                            value={formData.d_DeathMonth}
                            onChange={handleChange}
                            ref={deathmonthRef}
                            required
                          >
                            <option
                              style={{ fontSize: "16px" }}
                              disabled
                              value=""
                            >
                              {labels["37"]}:
                            </option>
                            {/* Month options */}
                            {[
                              labels["87"],
                              labels["88"],
                              labels["89"],
                              labels["90"],
                              labels["91"],
                              labels["92"],
                              labels["93"],
                              labels["94"],
                              labels["95"],
                              labels["96"],
                              labels["97"],
                              labels["98"],
                            ].map((month, index) => (
                              <option
                                style={{ fontSize: "16px" }}
                                key={index}
                                value={index + 1}
                              >
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["38"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_DeathYear"
                            type="text"
                            maxLength="4"
                            pattern="^[0-9\b]+$"
                            value={formData.d_DeathYear}
                            onChange={handleChange}
                            ref={deathyearRef}
                            //   placeholder="Enter Year"
                            required
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["42"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="d_death_age"
                            type="number"
                            value={formData.d_death_age}
                            onChange={handleChange}
                            required
                            //   placeholder="Enter Age at Death"
                          />
                        </div>
                      </div>

                      {userData.RoutingID == 200 && (
                        <>
                          <div className="row gx-3 mb-1">
                            {/* Form Group (first name)*/}
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                                style={{ color: "#0061f2", fontWeight: 500 }}
                              >
                                {labels["178"]}&nbsp;
                              </label>
                            </div>
                          </div>
                          <div className="row gx-3 mb-1">
                            {/* Form Group (last name)*/}
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["39"]}:&nbsp;{labels["41"]}&nbsp;
                              </label>
                              <input
                                className="form-control new-style-input"
                                id="d_death_City"
                                type="text"
                                value={formData.d_death_City}
                                onChange={handleChange}
                                required
                                //   placeholder="Enter City/Town"
                              />
                            </div>
                            <div className="col-md-2">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                {labels["43"]}&nbsp;
                              </label>
                              <select
                                className="form-select new-style-input-sclect"
                                aria-label="Default select example"
                                id="d_death_Prov"
                                type="number"
                                value={formData.d_death_Prov}
                                onChange={handleChange}
                              >
                                <option disabled value="">
                                  {labels["44"]}:
                                </option>
                                <option value=" ">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                </option>
                                <option value="AB">{labels["73"]}</option>
                                <option value="BC">{labels["74"]}</option>
                                <option value="MB">{labels["75"]}</option>
                                <option value="NB">{labels["76"]}</option>
                                <option value="NL">{labels["77"]}</option>
                                <option value="NS">{labels["78"]}</option>
                                <option value="NT">{labels["79"]}</option>
                                <option value="NU">{labels["80"]}</option>
                                <option value="ON">{labels["81"]}</option>
                                <option value="PE">{labels["82"]}</option>
                                <option value="QC">{labels["83"]}</option>
                                <option value="SK">{labels["84"]}</option>
                                <option value="YT">{labels["85"]}</option>{" "}
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["30"]}&nbsp;{" "}
                              </label>
                              <select
                                className="form-select new-style-input-sclect"
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

                          <div className="row gx-3 mb-1">
                            <div className="col-md-2">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                {labels["45"]} &nbsp;
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}
                              </label>
                              <select
                                className="form-select new-style-input-sclect"
                                aria-label="Default select example"
                                id="d_dispDeathDay"
                                value={formData.d_dispDeathDay}
                                onChange={handleChange}
                                // required
                              >
                                <option
                                  style={{ fontSize: "16px" }}
                                  disabled
                                  value=""
                                >
                                  {labels["46"]}:
                                </option>
                                {/* Generate days */}
                                {[...Array(31)].map((_, i) => (
                                  <option
                                    style={{ fontSize: "16px" }}
                                    key={i + 1}
                                    value={i + 1}
                                  >
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* Form Group (last name)*/}
                            <div className="col-md-2">
                              <label
                                className="small mb-1"
                                htmlFor="inputLastName"
                              >
                                {labels["47"]} &nbsp;
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}
                              </label>
                              <select
                                className="form-select new-style-input-sclect"
                                aria-label="Default select example"
                                id="d_dispDeathMonth"
                                value={formData.d_dispDeathMonth}
                                onChange={handleChange}
                                ref={disposmonthRef}
                                // required
                              >
                                <option
                                  style={{ fontSize: "16px" }}
                                  disabled
                                  value=""
                                >
                                  {labels["48"]}:
                                </option>
                                {/* Month options */}
                                {[
                                  labels["87"],
                                  labels["88"],
                                  labels["89"],
                                  labels["90"],
                                  labels["91"],
                                  labels["92"],
                                  labels["93"],
                                  labels["94"],
                                  labels["95"],
                                  labels["96"],
                                  labels["97"],
                                  labels["98"],
                                ].map((month, index) => (
                                  <option
                                    style={{ fontSize: "16px" }}
                                    key={index}
                                    value={index + 1}
                                  >
                                    {month}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["49"]}&nbsp;
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}
                              </label>
                              <input
                                className="form-control new-style-input"
                                id="d_dispDeathYear"
                                type="text"
                                maxLength="4"
                                pattern="^[0-9\b]+$"
                                value={formData.d_dispDeathYear}
                                onChange={handleChange}
                                ref={dispyearRef}
                                // required
                                //   placeholder="Enter Year"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                htmlFor="inputFirstName"
                              >
                                {labels["50"]}&nbsp;
                                {/* <span style={{ color: "#FF0000" }}> *</span> */}
                              </label>
                              <input
                                className="form-control new-style-input"
                                id="d_disp_Name"
                                type="text"
                                value={formData.d_disp_Name}
                                onChange={handleChange}
                                // required
                                //   placeholder="Enter Cemetery/Crematorium Name "
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-xl px-4 mt-4">
              <div className="row">
                <div className="col-xl-12">
                  {/* Account details card*/}
                  <div className="card mb-4">
                    <div className="card-header"> {labels["52"]}:</div>
                    <div className="card-body">
                      {/* Form Row*/}

                      <div className="row gx-3 mb-1">
                        {/* Form Group (first name)*/}
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["53"]}&nbsp;
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
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
                        {/* Form Group (last name)*/}
                        <div className="col-md-5">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["55"]}&nbsp;{" "}
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="e_First"
                            type="text"
                            value={formData.e_First}
                            onChange={handleChange}
                            required
                            //   placeholder="Enter First Name"
                          />
                        </div>

                        <div className="col-md-5">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["56"]}&nbsp;
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="e_Initial"
                            type="text"
                            value={formData.e_Initial}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["57"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="e_Last"
                            type="text"
                            value={formData.e_Last}
                            onChange={handleChange}
                            required
                            //   placeholder="Enter Last Name"
                          />
                        </div>
                      </div>
                      {/* checkbox */}
                      <div className="row gx-3 mb-1">
                        <div className="col-md-6 d-flex align-items-center">
                          <label className="small  me-2">
                            {labels["58"]}&nbsp;
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked === true) {
                                console.log(
                                  "dr32",
                                  e.target.checked,
                                  formData.d_Address
                                );

                                formData.e_Address = formData.d_Address;
                                document.getElementById("e_Address").value =
                                  formData.d_Address;

                                formData.e_Unit = formData.d_Unit;
                                document.getElementById("e_Unit").value =
                                  formData.d_Unit;

                                formData.e_City = formData.d_City;
                                document.getElementById("e_City").value =
                                  formData.d_City;

                                formData.e_Prov = formData.d_Prov;
                                document.getElementById("e_Prov").value =
                                  formData.d_Prov;

                                // formData.e_AreaCode = formData.d_AreaCode;
                                // document.getElementById("e_AreaCode").value =

                                //   formData.d_AreaCode;

                                // formData.e_exchange = formData.d_exchange;
                                // document.getElementById("e_exchange").value =
                                //   formData.d_exchange;

                                // formData.e_phone_4 = formData.d_phone;
                                // document.getElementById("e_phone_4").value =
                                //   formData.d_phone;

                                //  formData.d_AreaCode;

                                // formData.e_exchange = formData.d_exchange;
                                // document.getElementById("e_exchange").value =
                                //  formData.d_exchange;

                                // formData.e_phone_4 = formData.d_phone;
                                // document.getElementById("e_phone_4").value =
                                //  formData.d_phone;

                                formData.e_Postal = formData.d_Postal;
                                document.getElementById("e_Postal").value =
                                  formData.d_Postal;

                                setFormData(formData);
                                console.log(formData.e_Address, formData);
                              }
                              if (e.target.checked === false) {
                                console.log(
                                  "dr325",
                                  e.target.checked,
                                  formData.d_Address
                                );
                                document.getElementById("e_Address").value = "";
                                formData.e_Address = "";

                                document.getElementById("e_Unit").value = "";
                                formData.e_Unit = "";

                                document.getElementById("e_City").value = "";
                                formData.e_City = "";

                                document.getElementById("e_Prov").value = "";
                                formData.e_Prov = "";

                                // document.getElementById("e_AreaCode").value =
                                //   "";
                                // formData.e_AreaCode = "";

                                // document.getElementById("e_exchange").value =

                                //   "";

                                //  "";

                                // formData.e_exchange = "";
                                // document.getElementById("e_phone_4").value = "";
                                // formData.e_phone_4 = "";
                                document.getElementById("e_Postal").value = "";
                                formData.e_Postal = "";

                                setFormData(formData);
                                console.log(formData.e_Address, formData);
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        {/* Form Group (first name)*/}

                        {/* Form Group (last name)*/}
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["59"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="e_Address"
                            value={formData.e_Address}
                            type="text"
                            onChange={handleChange}
                            required
                            //   placeholder="Enter Street Address"
                          />
                        </div>

                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["60"]}&nbsp;
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="e_Unit"
                            type="text"
                            value={formData.e_Unit}
                            onChange={handleChange}
                            required
                            //   placeholder="Enter Unite/Suite"
                          />
                        </div>
                      </div>

                      <div className="row gx-3 mb-1">
                        {/* Form Group (first name)*/}

                        {/* Form Group (last name)*/}
                        <div className="col-md-6">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["61"]}&nbsp;{" "}
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          <input
                            className="form-control new-style-input"
                            id="e_City"
                            type="text"
                            value={formData.e_City}
                            onChange={handleChange}
                            required

                            //   placeholder="Enter City/Town"
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["62"]}&nbsp;
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="e_Prov"
                            value={formData.e_Prov}
                            onChange={handleChange}
                          >
                            <option disabled value="">
                              {labels["63"]}:
                            </option>
                            <option value=" "> &nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="AB">{labels["73"]}</option>
                            <option value="BC">{labels["74"]}</option>
                            <option value="MB">{labels["75"]}</option>
                            <option value="NB">{labels["76"]}</option>
                            <option value="NL">{labels["77"]}</option>
                            <option value="NS">{labels["78"]}</option>
                            <option value="NT">{labels["79"]}</option>
                            <option value="NU">{labels["80"]}</option>
                            <option value="ON">{labels["81"]}</option>
                            <option value="PE">{labels["82"]}</option>
                            <option value="QC">{labels["83"]}</option>
                            <option value="SK">{labels["84"]}</option>
                            <option value="YT">{labels["85"]}</option>{" "}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["67"]}&nbsp;
                          </label>
                          <input
                            ref={postalRef}
                            type="text"
                            id="e_Postal"
                            className="form-control new-style-input"
                            value={formData.e_Postal}
                            onChange={handleChange}
                            //   placeholder="Enter Postal Code"
                          />
                        </div>
                      </div>
                      <div className="row gx-3 mb-1">
                        <div className="col-md-4">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["40"]}&nbsp;
                          </label>
                          <select
                            className="form-select new-style-input-sclect"
                            aria-label="Default select example"
                            id="e_Country"
                            value={formData.e_Country}
                            onChange={handleChange}
                            defaultValue={formData.e_Country}
                          >
                            <option value=" "> &nbsp;&nbsp;&nbsp;&nbsp;</option>
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

                      <div className="row gx-3 mb-1">
                        {/* Form Group (last name)*/}
                        <div className="col-md-2" style={{ width: "13%" }}>
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels["64"]}&nbsp;
                            {/* <span style={{ color: "#FF0000" }}> *</span> */}
                          </label>
                          <div style={{ display: "flex" }}>
                            <span
                              style={{
                                fontSize: "39px",
                                marginTop: "-13px",
                                fontWeight: 100,
                              }}
                            >
                              (
                            </span>
                            <input
                              style={{ height: "35px", padding: "10px" }}
                              className="form-control new-style-input"
                              id="e_AreaCode"
                              type="text"
                              maxLength="3"
                              value={formData.e_AreaCode}
                              onChange={handleChange}
                              // required
                              //   placeholder="Enter Area Code"
                            />
                            <span
                              style={{
                                fontSize: "39px",
                                marginTop: "-13px",
                                fontWeight: 100,
                              }}
                            >
                              )
                            </span>
                          </div>
                        </div>

                        <div className="col-md-1" style={{ width: "11%" }}>
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                          >
                            {labels[""]}&nbsp;
                            {/* <span style={{ color: "#FF0000" }}> *</span> */}
                          </label>
                          <input
                            style={{ height: "35px", padding: "10px" }}
                            className="form-control new-style-input"
                            id="e_exchange"
                            type="text"
                            maxLength="3"
                            value={formData.e_exchange}
                            onChange={handleChange}
                            // required
                            //   placeholder="Enter Exchange"
                          />
                        </div>
                        <div className="col-md-2">
                          <label
                            className="small mb-1"
                            htmlFor="inputFirstName"
                            style={{ visibility: "hidden" }}
                          >
                            aze
                          </label>
                          <div style={{ display: "flex" }}>
                            <span
                              style={{
                                fontSize: "40px",
                                marginTop: "-14px",
                                fontWeight: 100,
                              }}
                            >
                              - &nbsp;
                            </span>
                            <input
                              style={{ height: "38px", padding: "10px" }}
                              className="form-control new-style-input"
                              id="e_phone_4"
                              type="text"
                              maxLength="4"
                              value={formData.e_phone_4}
                              onChange={handleChange}
                              // required
                              //   placeholder="Enter Phone No"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="row gx-3 mb-1"
                        style={{ marginTop: "-60px" }}
                      >
                        {/* Form Group (first name)*/}
                        <div className="col-md-3">
                          <label className="small mb-1" htmlFor="inputLastName">
                            {labels["68"]}&nbsp;
                            <span style={{ color: "#FF0000" }}> *</span>
                          </label>
                          {labels.selectedLanguage === "en" && (
                            <select
                              className="form-select new-style-input-sclect"
                              aria-label="Default select example"
                              id="e_relationship"
                              value={formData.e_relationship}
                              onChange={handleChange}
                              required
                            >
                              <option disabled value="">
                                {labels["69"]}:
                              </option>
                              <option value="Executor"> {labels["173"]}</option>
                              <option value="Next of Kin">
                                {labels["174"]}
                              </option>
                              <option value="Declared Responsible Person">
                                {labels["175"]}
                              </option>
                              <option value="Legal Representative">
                                {labels["176"]}
                              </option>
                              <option value="Informant">{labels["177"]}</option>
                            </select>
                          )}
                          {labels.selectedLanguage === "fr" && (
                            <select
                              className="form-select new-style-input-sclect"
                              aria-label="Default select example"
                              id="e_relationship"
                              value={formData.e_relationship}
                              onChange={handleChange}
                              required
                            >
                              <option disabled value="">
                                {labels["69"]}:
                              </option>

                              <option value="liquidateur de succession">
                                {" "}
                                {labels["173"]}
                              </option>
                              <option value="représentant de famille">
                                {labels["174"]}
                              </option>
                              <option value="Représentant légal">
                                {labels["175"]}
                              </option>
                            </select>
                          )}
                        </div>
                        {/* Form Group (last name)*/}
                      </div>

                      <div className="three_button_class mt-2">
                        <button
                          className="stylish-button"
                          disabled={requesting}
                          onClick={() => {
                            const requiredElements = document.querySelectorAll(
                              "input[required], select[required]"
                            );

                            requiredElements.forEach((element) => {
                              console.log("b5", {
                                tagName: element.tagName,
                                id: element.id,
                              });
                            });
                            if (formData.d_Prov == "") {
                              NotificationManager.error(
                                "Please indicate a deceased province name"
                              );
                              document.getElementById("d_Prov").focus();
                              return;
                            }
                            if (formData.d_First == "") {
                              NotificationManager.error(
                                "Please indicate a First Name"
                              );
                              document.getElementById("d_First").focus();
                              return;
                            }

                            if (formData.d_Last == "") {
                              NotificationManager.error(
                                "Please indicate a Last Name"
                              );
                              document.getElementById("d_Last").focus();
                              return;
                            }

                            if (formData.d_Address == "") {
                              NotificationManager.error(
                                "Please indicate a Address"
                              );
                              document.getElementById("d_Address").focus();
                              return;
                            }

                            if (formData.d_Postal == "") {
                              NotificationManager.error(
                                "Please indicate a Postal Code"
                              );
                              document.getElementById("d_Postal").focus();
                              return;
                            }

                            if (formData.d_Day == "") {
                              NotificationManager.error(
                                "Please indicate a Birth Day"
                              );
                              document.getElementById("d_Day").focus();
                              return;
                            }

                            if (formData.d_Month == "") {
                              NotificationManager.error(
                                "Please indicate a Birth Month"
                              );
                              document.getElementById("d_Month").focus();
                              return;
                            }

                            if (formData.d_Year == "") {
                              NotificationManager.error(
                                "Please indicate a Birth Year"
                              );
                              document.getElementById("d_Year").focus();
                              return;
                            }

                            if (formData.d_DeathDay == "") {
                              NotificationManager.error(
                                "Please indicate a Death Day"
                              );
                              document.getElementById("d_DeathDay").focus();
                              return;
                            }

                            if (formData.d_DeathMonth == "") {
                              NotificationManager.error(
                                "Please indicate a Death Month"
                              );
                              document.getElementById("d_DeathMonth").focus();
                              return;
                            }

                            if (formData.d_DeathYear == "") {
                              NotificationManager.error(
                                "Please indicate a Death Year"
                              );
                              document.getElementById("d_DeathYear").focus();
                              return;
                            }

                            // if (formData.d_death_age == "") {
                            //   NotificationManager.error(
                            //     "Please indicate a Death Age"
                            //   );
                            //   document.getElementById("d_death_age").focus();
                            //   return;
                            // }

                            // if (
                            //   formData.d_dispDeathDay == "" &&
                            //   userData.RoutingID == 200
                            // ) {
                            //   NotificationManager.error(
                            //     "Please indicate a Disposition Day"
                            //   );
                            //   document.getElementById("d_dispDeathDay").focus();
                            //   return;
                            // }

                            // if (
                            //   formData.d_dispDeathMonth == "" &&
                            //   userData.RoutingID == 200
                            // ) {
                            //   NotificationManager.error(
                            //     "Please indicate a Disposition Month"
                            //   );
                            //   document
                            //     .getElementById("d_dispDeathMonth")
                            //     .focus();
                            //   return;
                            // }

                            // if (
                            //   formData.d_dispDeathYear == "" &&
                            //   userData.RoutingID == 200
                            // ) {
                            //   NotificationManager.error(
                            //     "Please indicate a Disposition Year"
                            //   );
                            //   document
                            //     .getElementById("d_dispDeathYear")
                            //     .focus();
                            //   return;
                            // }

                            if (formData.d_City == "") {
                              NotificationManager.error(
                                "Please indicate a deceased city/town name"
                              );
                              document.getElementById("d_City").focus();
                              return;
                            }

                            if (formData.d_SIN == "") {
                              NotificationManager.error(
                                "Please indicate a SIN"
                              );
                              document.getElementById("d_SIN").focus();
                              return;
                            }

                            if (formData.e_First == "") {
                              NotificationManager.error(
                                "Please indicate a First Name"
                              );
                              document.getElementById("e_First").focus();
                              return;
                            }

                            if (formData.e_Last == "") {
                              NotificationManager.error(
                                "Please indicate a Last Name"
                              );
                              document.getElementById("e_Last").focus();
                              return;
                            }

                            if (formData.e_Address == "") {
                              NotificationManager.error(
                                "Please indicate a Address"
                              );
                              document.getElementById("e_Address").focus();
                              return;
                            }

                            if (formData.e_City == "") {
                              NotificationManager.error(
                                "Please indicate a City"
                              );
                              document.getElementById("e_City").focus();
                              return;
                            }

                            // if (formData.e_AreaCode == "") {
                            //   NotificationManager.error(
                            //     "Please indicate a Area Code"
                            //   );
                            //   document.getElementById("e_AreaCode").focus();
                            //   return;
                            // }

                            // if (formData.e_exchange == "") {
                            //   NotificationManager.error(
                            //     "Please indicate a Exchange"
                            //   );
                            //   document.getElementById("e_exchange").focus();
                            //   return;
                            // }

                            // if (formData.e_phone_4 == "") {
                            //   NotificationManager.error(
                            //     "Please indicate a Phone Number"
                            //   );
                            //   document.getElementById("e_phone_4").focus();
                            //   return;
                            // }

                            if (formData.e_relationship == "") {
                              NotificationManager.error(
                                "Please indicate a Relationship"
                              );
                              document.getElementById("e_relationship").focus();
                              return;
                            }
                            handleSubmit();
                          }}
                        >
                          {labels["71"]}
                        </button>
                        {/* <button
                          style={{ width: "200px" }}
                          class="stylish-buttonSignout"
                          onClick={handleLogout}
                        >
                          SignOut
                        </button> */}
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
      {/* </form> */}
    </>
  );
};

export default EditPesdata;
