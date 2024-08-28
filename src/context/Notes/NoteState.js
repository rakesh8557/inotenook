import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const notesinitial = [];

  const [notes, setNotes] = useState(notesinitial);


  //get notes
  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };


  // Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    response.status === await 200 && getnote();
  };

  // Edit a note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );

    //client side
    response.status === await 200 && getnote();
  };

  // Delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const newNotes = response.status === 200 && notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addnote, editnote, deletenote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
