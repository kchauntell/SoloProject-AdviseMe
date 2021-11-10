import React, { useEffect, useState } from 'react';
import {NavLink, Route, useParams} from 'react-router-dom'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebook } from '../../store/notebook';
import './NotebooksPage.css';

function NoteBooksPage() {
  const dispatch = useDispatch();
  const { notebookId } = useParams();
  // const pokemon = useSelector(state => {
  //   return state.map(notebookId => state.pokemon[notebookId]);
  // });
  const [notebooks, setNotebooks] = useState('');

  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch]);

  if(!notebooks)
  return (
    <main>
      <div> ADVISE WITH CAUTION AND CARE! </div>
      <nav>

      </nav>
    </main>

  )
}

export default NoteBooksPage;
