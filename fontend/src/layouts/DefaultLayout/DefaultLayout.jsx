import React from "react";
// import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Footer from "../../components/Footer/Footer";
import Page from "./page";
import Footer from "../components/Footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div>
        {/* <Header />
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer /> */}
        <Page mainContent={children} />
      </div>
    </>
  );
};

export default DefaultLayout;
