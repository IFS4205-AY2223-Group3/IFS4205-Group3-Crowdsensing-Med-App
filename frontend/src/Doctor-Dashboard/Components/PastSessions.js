import * as React from "react";
import Title from "../../Components/Title";
import "../Doctors.css";

// Generate Order Data
function createData(id, date, name, diagnosis, prescription) {
  return { id, date, name, diagnosis, prescription };
}

const rows = [
  createData(0, "16 Mar, 2019", "Elvis Presley", "Covid-19", "Vaccine"),
  createData(1, "16 Mar, 2019", "Paul McCartney", "Covid-19", "Vaccine"),
  createData(2, "16 Mar, 2019", "Tom Scholz", "Flu", "Cough Medicine"),
  createData(3, "16 Mar, 2019", "Michael Jackson", "Covid-19", "Vaccine"),
  createData(4, "15 Mar, 2019", "Bruce Springsteen", "Flu", "Cough Medicine"),
  createData(
    4,
    "15 Mar, 2019",
    "Wen Yu Loh",
    "Eye Brow Accident",
    "Embroiling"
  ),
];

export default function PastSessions() {
  return (
    <React.Fragment>
      <Title>Past Sessions</Title>
      <table>
        <tr>
          <th>Date Time</th>
          <th>Patient Name</th>
          <th>Prescription</th>
          <th>Diagnosis</th>
        </tr>
        {rows.map((rows) => (
          <tr>
            <td>{rows.date}</td>
            <td>{rows.name}</td>
            <td>{rows.diagnosis}</td>
            <td>{rows.prescription}</td>
          </tr>
        ))}
      </table>
    </React.Fragment>
  );
}
