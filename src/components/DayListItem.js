import React from "react";
import "components/DayListItem.scss";
import className from "classnames";

export default function DayListItem(props) {
  
  const formatSpots = () => {

    if (props.spots === 0) {

      return "no spots remaining";

    }

    if (props.spots === 1) {

      return `${props.spots} spot remaining`;

    }

    return `${props.spots} spots remaining`;

  }

  const dayClass = className("day-list__item", {"day-list__item--selected": props.selected,
"day-list__item--full": props.spots === 0});

  return (
    <li onClick={props.setDay} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );

}
