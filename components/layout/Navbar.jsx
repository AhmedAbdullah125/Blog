import React, { useEffect, useState } from "react";
import classes from "./layout.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useFontSize } from "@/store/FontSizeContext";

const Navbar = ({
  rtl,
  handleRtl,
  handleAccessibility,
  handleCaptilizling,
}) => {
  const { fontSizeGeneral, increaseFontSize, decreaseFontSize } = useFontSize();
  const { setfontSizeGeneral } = useFontSize();
  const { t } = useTranslation();
  //setting up state and functions for feedback dialog
  // Function to format the current date in the desired Arabic format
  function formatArabicDate() {
    const now = new Date();
    // Options for formatting the date in Arabic
    const options = {
      weekday: "long", // Full day name (الاحد)
      day: "numeric", // Day of the month (٢٧)
      month: "long", // Full month name (مارس)
      year: "numeric", // Year (٢٠٢٢)
      era: "short", // Era (٢٣ شعبان ١٤٤٣)
      hour: "2-digit", // Hour (٠٧)
      minute: "2-digit", // Minute (١٣)
    };
    // Format the date and return the result
    return new Intl.DateTimeFormat(
      !rtl ? "us" : "ar-SA-u-nu-latn",
      options
    ).format(now);
  }

  useEffect(()=>{
    if(!localStorage.getItem("fontSize")){
      setfontSizeGeneral(0);
    }
    else{
      setfontSizeGeneral(parseInt(localStorage.getItem("fontSize")));
    }
    if(localStorage.getItem("rtl")=="rtl"){
      handleRtl();
    }
    else{
      localStorage.setItem("rtl","ltr")
    }
  },[])
  return (
    <>
      <div className={classes.navBottom} style={{ direction: !rtl ? "rtl" : "initial" }}>
        <div className={classes.langAcess}>
          <div className={`${classes.languageRtl} ${ !rtl ? classes.langArabic : "" }`} onClick={handleRtl} style={{ borderLeft: !rtl ? "1px solid #fff" : "none" }} >
            <p style={{ fontFamily: rtl ? " " : "DINNext-Arabic-meduim", ontSize: `${14 + fontSizeGeneral}px`, }} > {t("lang")} </p>
          </div>
          <Image onClick={handleAccessibility} src="/assets/svg/accessability.svg" width={20} height={20} alt="accessability" style={{ cursor: "pointer" }} />
          <div className={classes.fonts}>
            <p onClick={increaseFontSize}>A+</p>
            <p onClick={handleCaptilizling}>AA</p>
            <p onClick={decreaseFontSize}>A-</p>
          </div>
        </div>
        <div className={classes.contactDate} style={{ alignItems: rtl ? "flex-start" : "flex-end" }} >
          <div className={classes.dateSaudi}  style={{ fontSize: `${15 + fontSizeGeneral}px` }} >
            <p style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "" }}>
              {formatArabicDate()}
            </p>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
