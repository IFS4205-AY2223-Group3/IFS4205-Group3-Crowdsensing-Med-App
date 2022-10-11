import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import loading from "../imports/loading.gif";
import Title from "./Title";
import { VIEW_COUNT_URL } from "../api/constants";
import axios from "axios";

export default function Crowd() {
  const [count, setCrowdCounter] = useState(0);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(VIEW_COUNT_URL)
        .then(function (response) {
          setCrowdCounter(response.data.count);
          setSuccess(true);
          setBuffer(false);
        })
        .catch(function (err) {
          console.log(err.response);
          setErrMsg(err.response.data.message);
          setFailure(true);
          setBuffer(false);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const date = new Date(count.time_recorded);
  const str_date = date.toString().split("GMT")[0];

  if (success) {
    return (
      <React.Fragment>
        <Title>Crowd Counter</Title>
        <Typography component="p" variant="h4">
          {count.count}%
        </Typography>
        <br></br>
        <div>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {str_date}
          </Typography>{" "}
        </div>
      </React.Fragment>
    );
  } else if (buffer) {
    return (
      <React.Fragment>
        <Title>Crowd Counter</Title>
        <Typography color="text.primary" sx={{ flex: 5 }}>
          Generating...
        </Typography>{" "}
        <img src={loading} />
      </React.Fragment>
    );
  } else if (failure) {
    return (
      <React.Fragment>
        <Title>Crowd Counter</Title>
        <Typography color="text.primary" sx={{ flex: 5 }}>
          {errMsg}
        </Typography>{" "}
      </React.Fragment>
    );
  }
}
