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
  // const note = useSelector(state => {
  //   let arrNote = Object.entries(state.note);
  //   let adviceNotes = arrNote.map((obj) => obj[1])
  //   return adviceNotes;
  // });

  // useEffect(() => {
  //   dispatch(getNote());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch])
  if(!notebook)
    return null;

  const notes = notebook.map((book) => book.Notes[0])

  return (
    <main>
      <h1> Study the WISDOM, please CHOOSE the RIGHT PATH!</h1>
      <div>
        <a
          href='/notes'
        > Add Note</a>
      </div>
      <div>
        <ul>
          {notebook.map((book) => {
            return (
              <div>
                {
                  notes.map((note) => {
                    let noteEntry = note.note
                    let sampleNote = noteEntry.slice(0, 75) + '...';
                    if (book.id === note.noteBookId) {
                      return (
                        <div>
                          <li>
                            <NavLink key={note.id} to={`/notes/${note.id}`}>
                              {sampleNote}
                            </NavLink>
                          </li>
                        </div>
                      )}
                  })
                }
              </div>
            )
          })}
        </ul>
      </div>
    </main>

  )
}

export default NoteBooksIDPage;

// {
//   notes.map((note) => {
//     let noteEntry = note.note
//     let sampleNote = noteEntry.slice(0, 75) + '...';
//     if (note.noteBookId === book.id)
//       return (
//         <div>
//           <li>
//             <NavLink key={note.id} to={`/notes/${note.id}`}>
//               {sampleNote}
//             </NavLink>
//           </li>
//         </div>
//       )
//   })
// }
