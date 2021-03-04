import "components/InterviewerListItem.scss";
import React from "react";
import className from "classnames";

export default function InterviewerListItem(props) {

  const interviewerClass = className("interviewers__item", {"interviewers__item--selected": props.selected});

  return (
    <li className={interviewerClass} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected? props.name: ""}
    </li>
  );
  
};
