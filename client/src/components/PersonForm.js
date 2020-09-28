import React from "react";
const PersonForm = (props) => {
  return (
    <form onSubmit={props.formOnSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameOnchange} />
      </div>
      <div>
        Number:{" "}
        <input value={props.numberValue} onChange={props.numberOnchange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
//PersonForm  nameValue={newName} nameOnchange={handleNumberAdd} numberValue={newNumber} numberOnchange={handleNumberAdd}/>
