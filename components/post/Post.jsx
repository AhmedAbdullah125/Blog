import React, { useEffect, useState } from "react";
import classes from "../home/home-one.module.css";
import Image from "next/image";
import { useFontSize } from "@/store/FontSizeContext";
import { useTranslation } from "react-i18next";
import Link from 'next/link'
import ReactHtmlParser from "react-html-parser";


const Post = ({ post, rtl, }) => {
    const [showBtn, setShowBtn] = useState(false);
    const { fontSizeGeneral } = useFontSize();
    const { t } = useTranslation();
    console.log(post);
    let postt = post[0];
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
                <h1 style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "Montserrat", fontSize: `${32 + fontSizeGeneral}px` }} className={classes.hTitle} > {rtl ? postt.title : postt.titleEN} </h1>
                <div className={classes.imgTitleGrid}>
                    <img className={classes.postIMG} src={postt.img} />
                    <div className={classes.NamesContainer}>
                        <p className={classes.cardContent} style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "Montserrat", fontSize: `${20 + fontSizeGeneral}px` }}>{postt.author}</p>
                        <span className={classes.cardDate} style={{ fontSize: `${14 + fontSizeGeneral}px` }}>{postt.date}</span>
                    </div>
                </div>
                <p className={classes.cardContent} style={{ fontFamily: rtl ? "DINNext-Arabic-meduim " : "Montserrat", fontSize: `${16 + fontSizeGeneral}px` }}>{rtl ? ReactHtmlParser(postt.content) : ReactHtmlParser(postt.contentEN)}</p>
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

export default Post;
