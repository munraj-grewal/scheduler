import React from "react";
import "./styles.scss"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));

  }

  function deleteAppointment(event) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <article className="appointment" data-testid="appointment">
      <h2>{props.time}</h2>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message="Saving..." />}
        {mode === DELETING && <Status message="Deleting..." />}
        {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={back}/>}
        {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={back}/>}
        {mode === CONFIRM && 
          <Confirm 
          message="Are you sure you want to delete this appointment?" 
          onCancel={back}
          onConfirm={deleteAppointment}
          />}
        {mode === SHOW && (
          <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && <Form onCancel= {() => back()} interviewers={props.interviewers} onSave={save} />}
        {mode === EDIT && 
          <Form 
          onCancel= {() => back()} 
          interviewers={props.interviewers} 
          onSave={save} 
          
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          />}
    </article>
  )
}