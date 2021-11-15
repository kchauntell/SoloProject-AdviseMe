import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, useHistory, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import * as noteActions from '../../store/note';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebook } from '../../store/notebook';

function NoteBooksIDPage() {
  const sessionUser = useSelector(state => state.session.user)
  const {notebookId} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const notebook = useSelector(state => {
    // console.log(state)
    return state.notebook[notebookId]
  });

  console.log(sessionUser, '*********')
  console.log(notebook, '-------')

  let buttons;

  // if(sessionUser) {
  //   buttons = (
  //     <>
  //     <button
  //     >Edit Note</button>
  //     <button
  //     >Delete Note</button>
  //     </>
  //   )
  // }

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
                  </div>
                  {/* {buttons} */}
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
