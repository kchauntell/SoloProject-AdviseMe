import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebook } from '../../store/notebook';

function NoteBooksIDPage() {
  const {notebookId} = useParams();
  const dispatch = useDispatch();
  const notebook = useSelector(state => {
    console.log(state)
    return state.notebook[notebookId]
  });

  useEffect(() => {
    dispatch(getNotebook());
  }, [notebookId, dispatch])
  if(!notebook)
    return null;

  return (
    <main>
      <h1> Study the WISDOM, please CHOOSE the RIGHT PATH!</h1>
      <h2 align='center'>{notebook.title}</h2>
      <div>
        <NavLink
          to={`/notes/${notebookId}`}
        > Add Note</NavLink>
      </div>
      <div align='center'>
        <ul>
          {notebook.Notes.map((notes) => {
            if(notes.hidden === false){
              return (
                <div key={notes.id} >
                  <NavLink to={`/note/${notes.id}`}>
                    {notes.title}
                  </NavLink>
                  <div>
                    <p> {notes.note.slice(0, 75) + '...'}</p>
                    <NavLink to={`/note/edit/${notes.id}`}>Edit</NavLink>
                  </div>
                  <div>
                    <button type='delete'>Delete</button>
                  </div>
                </div>
              )}
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
