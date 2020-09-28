const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

let persons = [
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Hasan Luke",
    number: "89-90-78787-9",
    id: 5,
  },
  {
    name: "George Bush",
    number: "34-98-7876",
    id: 8,
  },
  {
    name: "Obama Barak",
    number: "23-89-787-90",
    id: 10,
  },
  {
    name: "Johno Kennedy",
    number: "34-78-90-67",
    id: 11,
  },
  {
    name: "Mohamed Buhari",
    number: "23-87-90",
    id: 12,
  },
  {
    name: "Ibrahim Baba",
    number: "230-876-980",
    id: 13,
  },
  {
    name: "Goodluck Jonathan",
    number: "234-678-8657",
    id: 15,
  },
  {
    name: "ason ghk",
    number: "340-887-987",
    id: 16,
  },
  {
    name: "Tony Morrisome",
    number: "457-865-978",
    id: 17,
  },
];

app.use(cors());
app.use(express.json());

//...

// app.post("/api/notes", (request, response) => {
//   const note = request.body;
//   console.log(note);

//   response.json(note);
// });

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons, "yyyuuuuuuooo");
  response.json(persons);
  //response.status(204).end();
});

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  const changePerson = { ...person, number: request.body.number };
  persons = persons.map((person) => (person.id !== id ? person : changePerson));

  response.json(persons);
});

app.get("/api/persons", (req, res) => {
  console.log("backend talking talkingggggg");
  res.json(persons);
});

//deployment setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//const PORT = 8081;
const PORT = process.env.PORT || 8081;
//app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.listen(PORT, () => {
  console.log(`Server runninmgggg on port ${PORT}`);
});
//https://note-react-note-app1.herokuapp.com/
