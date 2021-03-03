import { useState } from "react";

//function for transitioning and tracking state changes

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {

    setHistory(prev => {
      if (replace === false) {
        return [...prev, newMode]
      } else {
        const newHistory = [...prev];
        newHistory.pop()
        newHistory.push(newMode);
        return newHistory;
      }
    })
  }
  
  const back = function () {
    setHistory(prev => {
      if (history.length === 1 ) {
        const newHistory = [...prev];
        return newHistory
      }

      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    })
  }
  
  const mode = history.slice(-1)[0];

  return {mode, transition, back}
}