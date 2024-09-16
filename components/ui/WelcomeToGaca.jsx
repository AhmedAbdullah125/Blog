import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Button, Slide } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import classes from "./ui.module.css";
const WelcomeDialog = ({ onClose, videoUrl }) => {
  // console.log(videoUrl);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [videSrc, setVideoSrc] = useState(
    "https://www.youtube.com/embed/qaTB_u1THVs"
  );
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      
    >
      
    </Dialog>
  );
};

export default WelcomeDialog;
