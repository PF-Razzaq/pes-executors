import "./App.css";
import React, { useEffect } from "react";
import {
  NotificationContainer,
} from "react-notifications";
import { Navigate, useRoutes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Pesdata from "./Pages/Pesdata";
import "react-notifications/lib/notifications.css";
import PesPrint from "./Pages/PesPrint";
import Layout from "./Pages/Layout";
import VerificationCode from "./Pages/VerificationCode";
import PasswordRecovery from "./Pages/PasswordRecovery";
import NewPassword from "./Pages/NewPassword";
import PesModifyRecord from "./Pages/PesModifyRecord";
import EditPesdata from "./Pages/EditPesdata";
import AftercareList from "./Pages/AftercareList";
import PrivacyStatement from "./Pages/PrivacyStatement";
import FrenchandQuebecDocuments from "./Pages/FrenchandQuebecDocuments";
import Training from "./Pages/Training";
import useInactivity from "./utils/useInactivity";
import LandingPageOld from "./Pages/LandingPageOld";
import DOA from "./Pages/DOA";
import DOALogin from "./Pages/DOALogin";
import DOAReports from "./Pages/DOAReports";
import DOASearch from "./Pages/DOASearch";
import ComingSoon from "./Pages/ComingSoon";
import DOAUpdate from "./Pages/DOAUpdate";
import AftercareList365 from "./Pages/AftercareList365";
import AdminUsers from "./Pages/AdminUsers";
function App() {

  useEffect(() => {
    if ("caches" in window) {
      caches
        .keys()
        .then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            caches.delete(cacheName);
          });
        })
        .then(() => {
          // window.location.reload(true);
        });
    }
  }, []);

  useInactivity(30 * 60 * 1000); // 30 minutes inactivity timeout

  return (
    <>
      {" "}
      <NotificationContainer />

      {/* <BrowserRouter> */}
        <Layout>
          <AppRoutes />
        </Layout>
      {/* </BrowserRouter> */}
    </>
  );
}

function AppRoutes() {
  const token = localStorage.getItem("jwt");

  // Define routes using useRoutes inside the Router context
  const routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LandingPage /> },
    { path: "/input", element: token ? <Pesdata /> : <Navigate to="/login" replace /> },
    { path: "/Executorcomingsoon", element: <ComingSoon /> },
    { path: "/doalogin", element: <DOALogin /> },
    { path: "/doaadminusers", element: <AdminUsers /> },
    { path: "/doaupdate/:eventID", element: <DOAUpdate /> },
    { path: "/doasearch", element: <DOASearch /> },
    { path: "/doa", element: <DOA /> },
    { path: "/doareports", element: <DOAReports /> },
    { path: "/landingold", element: <LandingPageOld /> },
    { path: "/training", element: token ? <Training /> : <Navigate to="/login" replace /> },
    { path: "/aftercare", element: token ? <AftercareList /> : <Navigate to="/login" replace /> },
    { path: "/aftercare365", element: token ? <AftercareList365 /> : <Navigate to="/login" replace /> },
    { path: "/modify", element: token ? <PesModifyRecord /> : <Navigate to="/login" replace /> },
    { path: "/modifyRecord/:eventID", element: token ? <EditPesdata /> : <Navigate to="/login" replace /> },
    { path: "/PasswordRecovery", element: <PasswordRecovery /> },
    { path: "/VerificationCode", element: <VerificationCode /> },
    { path: "/NewPassword", element: <NewPassword /> },
    { path: "/PrivacyStatement", element: <PrivacyStatement /> },
    { path: "/executorPrint", element: token ? <PesPrint /> : <Navigate to="/login" replace /> },
    { path: "/FrenchandQuebecDocuments", element: token ? <FrenchandQuebecDocuments /> : <Navigate to="/login" replace /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return routes;
}


export default App;
