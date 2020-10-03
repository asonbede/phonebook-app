import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import PersonInfo from "./components/PersonInfo";
//import axios from "axios";
import personServices from "./servicies/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  // const [numbers, setNumbers] = useState([{ numbers: "22-34-44-55" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setsearchValue] = useState("");
  const [searchedPersons, setsearchedPersons] = useState([]);
  const [isSearch, setisSearch] = useState(false);
  const [addMessage, setAddMessage] = useState(null);
  const [personInfo, setPersonInfo] = useState(null);

  //fetch data(initial state of the application) from server using axios library
  useEffect(() => {
    console.log("effect");
    personServices.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  // let isSearch = false;
  //handle search value
  const handleCheckPhoneBook = (event) => {
    console.log(event.target.value, "targetttttyyy");
    //const personObjCopy= [...persons]
    //setPersons(persons);
    const inputValue = event.target.value;

    const searchResult = persons.filter((person) =>
      person.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setsearchedPersons(searchResult);
    setsearchValue(inputValue);
    setisSearch(true);
    // return searchResult;
  };

  //synchronize the value of the name input with state
  const handleNameAdd = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
    setisSearch(false);
  };

  //synchronize the value of the number input with state
  const handleNumberAdd = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
    setisSearch(false);
  };

  //add the value of the input to the phonobook if such name don't exist
  const addName = (event) => {
    event.preventDefault();
    if (isInPhoneBook) {
      // alert(`${newName} is already added to phonebook`);
      checkNameNumberSimilarity();
      setNewName("");
      setNewNumber("");
      return;
    }
    personServices
      .create({ name: newName, number: newNumber })
      .then((returtedPerson) => {
        console.log("promise fulfilled");
        setPersons(persons.concat(returtedPerson));
        setNewName("");
        setNewNumber("");
        //display message on successful addition
        setAddMessage(`Added ${returtedPerson.name}`);
        setTimeout(() => {
          setAddMessage(null);
        }, 5000);
      });
  };
  //implement delete handler
  const removePersonHandler = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    //const url = `http://localhost:3001/notes/${id}`;
    const personNameNumber = persons.find((n) => n.id === id);
    //const changeNote = { ...note, important: !note.important };
    const confirmResult = window.confirm(
      `Do you really want to delete ${personNameNumber.name}:${personNameNumber.number} from phonebook`
    );
    if (!confirmResult) {
      return;
    }
    personServices
      .deletePerson(id)
      .then((returnedPersons) => {
        setPersons(persons.filter((person) => person.id !== id));
        //console.log(returnedPersons, "rrrrrtrtrtr");
        // setPersons(returnedPersons);
      })
      .catch((error) => {
        alert(`the note ${personNameNumber.name} was already deleted`);
      });
  };

  //check whether name already exist in phonebook
  const isInPhoneBook = persons.some(
    (person) => person.name.toLowerCase() === newName.toLowerCase()
  );

  //replace existing number with new number if name already exist in phone book
  const checkNameNumberSimilarity = () => {
    console.log({ newName });
    const personNameNumberObj = persons.find(
      (n) => n.name.toLowerCase() === newName.toLowerCase()
    );
    //const personNumber = personNameNumberObj.number;
    console.log({ personNameNumberObj });
    const personId = personNameNumberObj.id;
    const confirmResult = window.confirm(
      `${newName} is already added to phonebook, replace the old number?`
    );
    if (confirmResult) {
      //const note = persons.find((person) => person.id === personId);

      const changePerson = { ...personNameNumberObj, number: newNumber };
      personServices
        .update(personId, changePerson)
        .then((returnedPerson) => {
          setPersons(
            //returnedPerson
            persons.map((person) =>
              person.id !== personId ? person : returnedPerson
            )
          );
        })
        //display message on failure to change number
        .catch(() => {
          setAddMessage(
            `Information of ${personNameNumberObj.name} has already been removed from server`
          );
          setTimeout(() => {
            setAddMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== personId));
        });
    }
  };

  // console.log(isSearch, "tooooyyyuuuu");
  const phonebookArray = isSearch ? searchedPersons : persons;

  //person info handler
  const personInfoHandler = (id) => {
    personServices
      .getPersonInfo(id)
      .then((returnedPersons) => {
        //setPersons(persons.filter((person) => person.id !== id));
        //console.log(returnedPersons, "rrrrrtrtrtr");
        // setPersons(returnedPersons);
        setPersonInfo(returnedPersons);
        setTimeout(() => {
          setPersonInfo(null);
        }, 5000);
      })
      .catch((error) => {
        alert(`person not found`);
      });
  };

  return (
    <div>
      <Notification message={addMessage} />
      <PersonInfo personinfo={personInfo} />
      <h2>Phonebook</h2>

      <Filter value={searchValue} onChange={handleCheckPhoneBook} />
      <h3>Add a New </h3>
      <PersonForm
        formOnSubmit={addName}
        nameValue={newName}
        nameOnchange={handleNameAdd}
        numberValue={newNumber}
        numberOnchange={handleNumberAdd}
      />

      <h3>Numbers</h3>
      {phonebookArray.map((person, index) => (
        <Persons
          person={person}
          key={person.id}
          removePersonHandler={() => removePersonHandler(person.id)}
          personInfoHandler={() => personInfoHandler(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
//https://phone-book-with-react-node.herokuapp.com/
