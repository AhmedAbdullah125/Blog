import React, { useEffect } from "react";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
const Layout = (props) => {
  const {
    changeFontSize,
    rtl,
    handleRtl,
    handleAccessibility,
    handleCaptilizling,
  } = props;
  

  return (
    <div style={{ fontFamily: rtl ? "DINNext-Arabic-meduim !important" : "" }}>
      <Navbar
        rtl={rtl}
        handleRtl={handleRtl}
        handleCaptilizling={handleCaptilizling}
        handleAccessibility={handleAccessibility}
        changeFontSize={changeFontSize}
      />
      {props.children}

      <Toaster />
    </div>
  );
};

export default Layout;
