import React, { useEffect, useState } from 'react';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebook } from '../../store/notebook';
import './NotebooksPage.css';

function NoteBooksPage() {
  const dispatch = useDispatch();
  const notebook = useSelector(state => {
    let arrNotebook = Object.entries(state.notebook)
    let books = arrNotebook.map((obj) => obj[1])
    return books;
  });

  const [notebooks, setNotebooks] = useState('');

  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch]);

  if(!notebook)
    return null;


  return (
    <main>
      <h1>ADVISE WITH CAUTION AND CARE!</h1>
        <div>
          <button
            type='submit'>Add Notebook
            </button>
        </div>
      <ul>
        {notebook.map((book)=> {
          if(book.private === false) {
            return (
            <div>
              <NavLink
                key={book.id}
                to={`/notebooks/${book.id}`}>
              {book.title}
              </NavLink>
              <ul>
                <li>{book.genre}</li>
                <li>Advice Given by: (pull in username)</li>
                <li> Potential List of Notes within Notebook </li>
              </ul>
            </div>
            )
          }
        }
      )}
      </ul>
    </main>

  )
}

export default NoteBooksPage;
