import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNote} from '../../store/note';

function NotesPage() {
  const {noteId} = useParams();
  const dispatch = useDispatch();
  const notes = useSelector(state => {
    return state.note[noteId]
  })

  console.log(notes)

  return (
    <h1> Full Note will be here </h1>
  )
}


export default NotesPage;
