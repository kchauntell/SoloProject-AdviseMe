import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, useHistory, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import * as noteActions from '../../store/note'
import { getNote} from '../../store/note';

function NotesPage() {
  const {noteId} = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const note = useSelector(state => {
    // console.log(state.note);
    return state.note[noteId]
  });

  // console.log(note, '*******');

  const handleEdit = async (e) => {
    e.preventDefault();

    history.push(`/notes/${noteId}/edit`)
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(noteActions.removeNote(noteId))
    history.push(`/`)
  }



  useEffect(() => {
    dispatch(getNote());
  }, [dispatch]);

  if(!note) return null;


  let buttons;
  if (sessionUser) {
    buttons = (
      <>
        <button
        onClick={(e) => handleEdit(e)}
        >Edit</button>
        <button
        onClick={(e) => handleDelete(e)}
        >Delete</button>
      </>
    )
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.note}</p>
      {buttons}
    </div>
  )
}


export default NotesPage;
