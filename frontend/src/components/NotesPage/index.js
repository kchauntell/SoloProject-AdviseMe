import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNote} from '../../store/note';

function NotesPage() {
  const {noteId} = useParams();
  const dispatch = useDispatch();
  const note = useSelector(state => {
    return state.note[noteId]
  });

  console.log(note.title, '*******');

  useEffect(() => {
    dispatch(getNote());
  }, [dispatch]);

  if(!note) return null;

  return (
    <div>
      <h1>Testing</h1>
    </div>
  )
}


export default NotesPage;
