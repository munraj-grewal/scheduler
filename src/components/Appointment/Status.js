import React from "react";
import "./styles.scss"

export default function Status(props) {

  let message = function() {
    return props.message;
  }

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{message()}</h1>
    </main>
  );
  
}