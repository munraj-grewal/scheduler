//get the appontments for the day
export function getAppointmentsForDay(state, day) {
  
  const appointments = [];

  if (!state.days.length) {

    return appointments;

  }

  const filteredDay = state.days.filter(dayz => dayz.name === day);

  if (!filteredDay.length) {

    return appointments;

  }

  filteredDay[0].appointments.forEach((appointment) => {

    appointments.push(state.appointments[appointment])

  });

  return appointments;

}

export function getInterview(state, interview) {

  const interviewData = {};

  if (interview === null) {

    return null;

  }

  interviewData.student = interview.student;
  interviewData.interviewer = state.interviewers[interview.interviewer];

  return interviewData;

}

//get the interviews for the day
export function getInterviewersForDay(state, day) {

  const interviewers = [];

  if (!state.days.length) {

    return interviewers;

  }

  const filteredDay = state.days.filter(dayz => dayz.name === day);

  if (!filteredDay.length) {

    return interviewers;

  }

  filteredDay[0].interviewers.forEach((appointment) => {

    interviewers.push(state.interviewers[appointment])

  });

  return interviewers;

}