import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Doctor_Dashboard.module.css";
import logo from "../imports/medibook.png";

const Submit_Examination = () => {
  return (
    <div className={styles.container}>
			<h1>You are prescribing Karl</h1>
    </div>
  );
};
export default Submit_Examination;
