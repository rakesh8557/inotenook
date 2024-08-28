import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addnote } = context;

  const [note, setNote] = useState({
    title: "",
    descripton: "",
    tag: ""
  });
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    addnote(note.title, note.descripton, note.tag);
    setNote({title: "",
        descripton: "",
        tag: "",})
  };

  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="descripton"
            value={note.descripton}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
