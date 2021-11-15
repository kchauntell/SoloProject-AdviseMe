import React, { useEffect, useState } from 'react';
import {NavLink, useParams, useHistory} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import * as notebookActions from '../../store/notebook'
import { useDispatch, useSelector } from 'react-redux';
import { getNotebook } from '../../store/notebook';
import './NotebooksPage.css';

function NoteBooksPage() {
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory();
  const {notebookId} = useParams();
  const dispatch = useDispatch();
  const notebook = useSelector(state => {
    let arrNotebook = Object.entries(state.notebook)
    let books = arrNotebook.map((obj) => obj[1])
    return books;
  });

  const [notebooks, setNotebooks] = useState('');

  const handleEdit = async (notebookId, e) => {
    e.preventDefault();

    // await dispatch(notebookActions.editNotebook(notebookId))
    history.push(`/notebooks/${notebookId}/edit`)
  }

  const handleDelete = async (notebookId, e) => {
    e.preventDefault();

    await dispatch(notebookActions.removeNotebook(notebookId))
    history.push(`/`)
  }
  let buttons;

  // if(sessionUser) {
  //   buttons = (
  //     <>
  //     <button
  //     onClick={(e) => handleEdit(e)}
  //     >Edit NoteBook</button>
  //     <button
  //     onClick={(e) => handleDelete(e)}
  //     >Delete NoteBook</button>
  //     </>
  //   )
  // }

  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch]);

  if(!notebook)
    return null;

  return (
    <main>
      <h1 align='center'>ADVISE WITH CAUTION AND CARE!</h1>
        <div align='right'>
          <a
            href='/notebooks'>Add Notebook
          </a>
          <a
          href='/:id/notebooks'>My Notebooks
          </a>
        </div>
      <ul>
        {notebook.map((book)=> {
          if(book.hidden === false) {
            if(sessionUser) {
              return (
                <div>
                  <NavLink
                    key={book.id}
                    to={`/notebooks/${book.id}`}>
                    {book.title}
                  </NavLink>
                  <ul>
                    <li>{book.genre}</li>
                  </ul>
                  <>
                    <button
                      onClick={(e) => handleEdit(book.id, e)}
                    >Edit NoteBook</button>
                    <button
                      onClick={(e) => handleDelete(book.id, e)}
                    >Delete NoteBook</button>
                  </>
                </div>)
            } else {
              return (
                <div>
                  <NavLink
                    key={book.id}
                    to={`/notebooks/${book.id}`}>
                    {book.title}
                  </NavLink>
                  <ul>
                    <li>{book.genre}</li>
                  </ul>
                </div>)
            }
          }
        }
        )}
      </ul>
    </main>

  )
}

export default NoteBooksPage;
