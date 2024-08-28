import React, {useContext} from "react";
import NoteContext from "../context/Notes/NoteContext";

const Noteitme = (props) => {
  const { note , updatenote} = props;
  const context = useContext(NoteContext);
  const { deletenote } = context;


  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i className="fa-solid fa-trash mx-2" onClick={() => {deletenote(note._id)}}></i>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>updatenote(note)}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitme;
