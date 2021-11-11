import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNote } from '../../store/note';
import { getNotebook } from '../../store/notebook';

function NoteBooksIDPage() {
  const dispatch = useDispatch();
  const notebook = useSelector(state => {
    let arrNotebook = Object.entries(state.notebook)
    let books = arrNotebook.map((obj) => obj[1])
    return books;
  });
  const note = useSelector(state => {
    let arrNote = Object.entries(state.note);
    let adviceNotes = arrNote.map((obj) => obj[1])
    return adviceNotes;
  });

  useEffect(() => {
    dispatch(getNote());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch])
  if(!note)
    return null;

  return (
    <main>
      <h1> Study the WISDOM, please CHOOSE the RIGHT PATH!</h1>
      <div>
        <a
          href='/notes'
        > Add Note</a>
      </div>
      <ul>
        {note.map((singleNote) => {
          if (singleNote.noteBookId === notebook.id) {
            return (
            <div>
              <NavLink
              key='singleNote.id'
              to={`/notes/${singleNote.id}`}>
              {singleNote.title}
              </NavLink>
            </div>)
          }
        })}
      </ul>
    </main>

  )
}

export default NoteBooksIDPage;
