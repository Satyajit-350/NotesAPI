const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/notesController");
const auth = require("../middlewares/auth");
const notesRouter = express.Router();

notesRouter.get("/", auth, getNote); //take a look the auth next function is the getNote function

notesRouter.post("/", auth, createNote);

//for updating and deleteing notes we need the user id
notesRouter.delete("/:id", auth, deleteNote);

notesRouter.put("/:id", auth, updateNote);

module.exports = notesRouter