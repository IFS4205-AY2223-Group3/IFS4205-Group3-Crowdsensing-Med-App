import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = {
  Monday_data: [
    createData("08:00", 0),
    createData("10:00", 70),
    createData("12:00", 80),
    createData("14:00", 85),
    createData("16:00", 95),
    createData("18:00", 10),
    createData("20:00", 5),
  ],
  Tuesday_data: [
    createData("08:00", 0),
    createData("10:00", 60),
    createData("12:00", 40),
    createData("14:00", 30),
    createData("16:00", 30),
    createData("18:00", 15),
    createData("20:00", 5),
  ],
  Wednesday_data: [
    createData("08:00", 0),
    createData("10:00", 10),
    createData("12:00", 45),
    createData("14:00", 75),
    createData("16:00", 35),
    createData("18:00", 55),
    createData("20:00", 40),
  ],
  Thursday_data: [
    createData("08:00", 0),
    createData("10:00", 40),
    createData("12:00", 75),
    createData("14:00", 85),
    createData("16:00", 90),
    createData("18:00", 60),
    createData("20:00", 30),
  ],
  Friday_data: [
    createData("08:00", 0),
    createData("10:00", 20),
    createData("12:00", 60),
    createData("14:00", 85),
    createData("16:00", 90),
    createData("18:00", 55),
    createData("20:00", 24),
  ],
  Saturday_data: [
    createData("08:00", 0),
    createData("10:00", 30),
    createData("12:00", 45),
    createData("14:00", 55),
    createData("16:00", 15),
    createData("18:00", 20),
    createData("20:00", 40),
  ],
  Sunday_data: [
    createData("08:00", 0),
    createData("10:00", 5),
    createData("12:00", 15),
    createData("14:00", 45),
    createData("16:00", 25),
    createData("18:00", 15),
    createData("20:00", 10),
  ],
};

export default function Chart() {
  const theme = useTheme();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = weekday[d.getDay()];
  var display_data = data[day + "_data"];

  return (
    <React.Fragment>
      <Title>Popular Times on {day}</Title>
      <ResponsiveContainer>
        <LineChart
          data={display_data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Filled (%)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
