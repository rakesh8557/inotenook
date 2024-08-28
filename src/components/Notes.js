import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";
import Noteitme from "./Noteitme";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getnote, editnote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate()
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnote();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    // const navigate = useNavigate()
    // navigate(redirect);

    const updatenote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleEditnote = (e) => {
        e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
    };
    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit NOTE</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label"> Title </label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label"> Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label"> Tag </label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleEditnote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitme key={note._id} updatenote={updatenote} note={note} />;
                })}
            </div>
        </>
    );
};
