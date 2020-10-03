import React from "react";
const Persons = (props) => {
  return (
    <p>
      {props.person.name} {props.person.number}
      <button onClick={props.removePersonHandler}>delete</button>
      <button onClick={props.personInfoHandler}>info</button>
    </p>
  );
};
export default Persons;
