import React from "react";
import { Typography } from "@mui/material";
import styles from "./HeaderTitle.module.css";

const HeaderTitle = () => {
  return (
    <Typography variant="h3" className={styles.headerTitle}>
      Parkin App
    </Typography>
  );
};

export default HeaderTitle;