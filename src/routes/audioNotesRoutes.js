const express = require("express");
const { getAudioNote, createAudioNote, deleteAudioNote} = require("../controllers/audioNoteController");
const auth = require("../middlewares/auth");
const audioNotesRouter = express.Router();

audioNotesRouter.get("/", auth, getAudioNote); //take a look the auth next function is the getNote function

audioNotesRouter.post("/", auth, createAudioNote);

//for updating and deleteing notes we need the user id
audioNotesRouter.delete("/:id", auth, deleteAudioNote);

module.exports = audioNotesRouter