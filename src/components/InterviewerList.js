import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {

  const { interviewers } = props
  InterviewerList.propTypes = {interviewers: PropTypes.array.isRequired};

  const interviewerList = interviewers.map(value => (
    <InterviewerListItem 
      key = {value.id}
      name={value.name} 
      selected={value.id === props.value}
      avatar={value.avatar}
      onChange={(event) => props.onChange(value.id)}  
      />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{props.name}</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
  
}