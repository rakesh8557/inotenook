const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Get All notes of user : GET | api/notes/fetchNotes
router.get("/fetchNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user_id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Add Notes : POST | api/notes/addNotes
router.post(
  "/addNotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      //error from express validator using models schema
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        }));
        return res.status(400).json({ errors: formattedErrors });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user_id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//update note : PUT | api/notes/updateNote
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //Create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //Check whether the note exists
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user_id) {
      return res.status(401).send("Not allowed");
    }
    
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//delete note : DELETE | api/notes/deleteNote
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    //Check whether the note exists
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user_id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
