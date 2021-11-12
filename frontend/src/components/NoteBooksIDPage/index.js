import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebook } from '../../store/notebook';

function NoteBooksIDPage() {
  const {notebookId} = useParams();
  const dispatch = useDispatch();
  const notebook = useSelector(state => {
    return state.notebook[notebookId]
  });


  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch])
  if(!notebook)
    return null;

  return (
    <main>
      <h1> Study the WISDOM, please CHOOSE the RIGHT PATH!</h1>
      <div>
        <NavLink
          to='/notes'
        > Add Note</NavLink>
      </div>
      <div>
        <ul>
          {notebook.Notes.map((notes) => {
            if(notes.hidden === false){
              return (
                <div key={notes.id} >
                  <NavLink to={`/notes/${notes.id}`}>
                    {notes.note.slice(0, 75) + '...'}
                  </NavLink>
                  <NavLink to={`/notes/edit/${notes.id}`}>Edit</NavLink>
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
