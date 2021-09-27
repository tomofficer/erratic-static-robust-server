const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: return a single user by id from /users/:userId in form of { data: Object }

app.use("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const foundId = users.find((user) => user.id === Number(userId));
  if (foundId === undefined) {
    next(`User ID not found: ${userId}`);
  } else {
    res.send({ data: foundId })
  }
});


// TODO: return an array of users from /users in form of { data: Array }
app.use("/users", (req, res) => {
  res.json({ data: users });
});


// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.use("/states/:stateCode", (req, res, next) => {
  const { stateCode } = req.params;
  const foundState = states[stateCode];
  
  if (foundState === undefined) {
    next(`State code not found: ${stateCode}`);
  } else {
    const stateData = {name: foundState, stateCode: stateCode};
    res.json({ data: stateData })
  }
});

// TODO: return all states from /states in the form of { data: Array }
app.use("/states", (req, res) => {
  res.json({ data: states });
});



// TODO: add not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// TODO: Add error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
