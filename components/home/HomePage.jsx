import React, { useEffect, useState } from "react";
import classes from "./home-one.module.css";
import Image from "next/image";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
import Link from 'next/link'

const HomePage = ({
  dataHome,
  rtl,
}) => {
  const [showBtn, setShowBtn] = useState(false);
  const { fontSizeGeneral } = useFontSize();
  const { t } = useTranslation();
  let [pageNumber,setPageNumber]= useState(1);
  const itemsPerPage = 9;
  const subDta  =dataHome.slice(pageNumber*itemsPerPage-itemsPerPage, pageNumber*itemsPerPage);
  console.log(dataHome);
  let paginArr =[];
  let maximumPage = Math.ceil(dataHome.length/itemsPerPage);
  for(let i=1;i<=maximumPage;i++){
    paginArr.push({i:i});
  }
  //side effect for showing arrow up Bottom when the window be in the second section or down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 300; // Adjust this value based on when you want the button to appear
      setShowBtn(scrollTop > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //Handling clicking button up to the top of the page
  const handleClick = () => {
    const targetElement = document.getElementById("home");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div style={{ direction: rtl ? "rtl" : "" }}>
      <div className={classes.container}>
        <h1 style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "Montserrat", fontSize: `${32 + fontSizeGeneral}px` }} className={classes.hTitle} > {t("myblog")} </h1>
        <div className={classes.cardsContainer}>
          {subDta.map((ele) =>
            <Link className={classes.card} href={`/post/${ele.id}`}>
              <h2 className={classes.cardTitle} style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "Montserrat", fontSize: `${20 + fontSizeGeneral}px` }}>{rtl ? ele.title : ele.titleEN}</h2>
              <div className={classes.cardContainer}>
                <img className={classes.cardIMG} src={ele.img} />
                <span className={classes.cardDate} style={{ fontSize: `${12 + fontSizeGeneral}px` }}>{ele.date}</span>
                <p className={classes.cardContent} style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "Montserrat", fontSize: `${16 + fontSizeGeneral}px` }}>{ele.author}</p>
              </div>
            </Link>
          )}
        </div>

        <div className={classes.paginationContainer}>
          <ul className={classes.pagination}>
            <li><p className={classes.paginationTerm} onClick={() => { if (pageNumber > 1) { setPageNumber(pageNumber - 1)}}}><Image
              src="/assets/svg/chevron-right.svg"
              width={12}
              height={12}
              alt="expand-more"
              style={rtl ? "" : { transform: "rotate(180deg)" }}
            /></p></li>
            {paginArr.map((ele) =>
              <li> <span onClick={() => {setPageNumber(ele.i)  }} className={ele.i == pageNumber ? `${classes.pageItem} ${classes.active}` : classes.pageItem}>{ele.i}</span></li>
            )}
            <li>
              <p className={classes.paginationTerm} onClick={() => { if (maximumPage > pageNumber) { setPageNumber(pageNumber + 1)} }}><Image
                src="/assets/svg/chevron-right.svg"
                width={12}
                height={12}
                alt="expand-more"
                style={rtl ? { transform: "rotate(180deg)" } : ""}
              /></p></li>
          </ul>
        </div>
      </div>

      {showBtn && (
        <div className={classes.btnUp} onClick={handleClick}>
          <Image
            src="/assets/svg/arrow-up.svg"
            width={15}
            height={15}
            alt="arrow-down"
            className={classes.arrowDown}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
