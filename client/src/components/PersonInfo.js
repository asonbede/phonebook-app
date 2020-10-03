import React from "react";
const PersonInfo = (props) => {
  if (props.personinfo) {
    const { name, number, id } = props.personinfo;

    return (
      <div>
        <p>name: {name}</p>
        <p>nuber: {number}</p>
        <p>id: {id}</p>
      </div>
    );
  } else {
    return null;
  }
};
export default PersonInfo;
