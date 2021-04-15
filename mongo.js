/* eslint-disable no-undef */
const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log(
//     "Please provide the password as an argument: node mongo.js <password>"
//   );
//   process.exit(1);
// }

// eslint-disable-next-line no-undef
const password = process.argv[2];

const url = `mongodb+srv://bede:${password}@cluster0.jjcpx.mongodb.net/phone-book?retryWrites=true&w=majority`;

// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .catch((error) => {
//     console.log("error occured");
//   });

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

//structure the database
const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//format note
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//create the database
const Phonebook = mongoose.model("Phonebook", noteSchema);

//fetching pphonebook entries
if (process.argv.length < 4) {
  Phonebook.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry.name);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  //adding data to the database
  const phonebook = new Phonebook({
    name,
    number,
  });

  phonebook
    .save()
    .then((result) => {
      console.log("note saved!");
      console.log(`added ${name} number ${number} to phonebook`);
      console.log(result, "yyuuuuoo");
      mongoose.connection.close();
    })
    .catch(() => {
      console.log("note not note saved");
    });
}
