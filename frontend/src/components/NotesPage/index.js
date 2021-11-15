import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNote} from '../../store/note';

function NotesPage() {
  const {noteId} = useParams();
  const dispatch = useDispatch();
  const note = useSelector(state => {
    // console.log(state.note);
    return state.note[noteId]
  });

  console.log(note, '*******');

  useEffect(() => {
    dispatch(getNote());
  }, [dispatch]);

  if(!note) return null;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.note}</p>
      <NavLink to={`/note/edit/${note.id}`}>Edit</NavLink>
    </div>
  )
}


export default NotesPage;
