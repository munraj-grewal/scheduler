import { useState, useEffect } from "react";
const axios = require('axios').default;

export default function useApplicationData(initial) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //books an interview
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = state.days.map((day) => {

      if (day.appointments.includes(id)) {

        const appointmentz = state.appointments[id];

        if (appointmentz.interview === null && appointmentz.id === id) {

          return {...day, spots: day.spots - 1}

        } else {

          return {...day};

        }

      } else {

        return {...day};

      }

    });

    const url = `/api/appointments/${id}`;

    return axios.put(url, appointment)
      .then(() => setState({...state, appointments, days: updatedDays}));

  };

  //cancel interview
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = state.days.map((day) => {

      if (day.appointments.includes(id)) {

        return {...day, spots: day.spots + 1};

      } else {

        return day;

      }

    });

    const url = `/api/appointments/${id}`;

    return axios.delete(url, appointment)
      .then(() => setState({...state, appointments, days: updatedDays}));

  };

  const setDay = day => setState({ ...state, day });

  //makes http request
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {

      setState(prev => ({

        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data

      }))

    });

  }, []);

  return {state, setDay, bookInterview, cancelInterview};
};