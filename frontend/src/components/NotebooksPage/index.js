import React, { useEffect, useState } from 'react';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebook } from '../../store/notebook';
import './NotebooksPage.css';

function NoteBooksPage() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const notebook = useSelector(state => {
    let arrNotebook = Object.entries(state.notebook)
    let books = arrNotebook.map((obj) => obj[1])
    return books;
  });

  const [notebooks, setNotebooks] = useState('');

  let buttons;

  if(sessionUser) {
    buttons = (
      <>
      <button>Edit NoteBook</button>
      <button>Delete NoteBook</button>
      </>
    )
  }

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
              <NavLink to={`/notebooks/${book.id}/edit`} > Edit Notebook</NavLink>
              {buttons}
            </div>)
          }
        }
        )}
      </ul>
    </main>

  )
}

export default NoteBooksPage;
