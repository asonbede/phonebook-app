import React from "react";
const Filter = (props) => {
  return (
    <>
      search phonebook: <input value={props.value} onChange={props.onChange} />
    </>
  );
};
export default Filter;
