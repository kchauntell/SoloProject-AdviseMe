import React, { useEffect, useState } from 'react';
import {BrowserRouter, NavLink, Route} from 'react-router-dom'
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
      <div> ADVISE WITH CAUTION AND CARE! </div>
      <ul>
        {notebook.map((book)=> {
          return (
          <div>
            <NavLink
              key='book.id'
              to={`./notebooks/${book.id}`}>
            {book.title}
            </NavLink>
          </div>)
        })}
      </ul>
      <div>
        <button type='submit'>Add Notebook</button>
      </div>
    </main>

  )
}

export default NoteBooksPage;
