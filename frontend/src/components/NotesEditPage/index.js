import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as noteActions from '../../store/note';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './NoteEditPage.css';

function NoteEditPage() {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState([]);

  // console.log(noteId, '-----------');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (note === '') {
      return
    }

    // const newNote = await dispatch(noteActions.({ hidden, title, note, noteBookId, userId: sessionUser.id }))
    // history.push(`/notebooks/${noteBookId}`);
  }

  const handleChange = (e) => {
    let checkbox = e.target;
    if (checkbox.checked) {
      setHidden(e.target.value === true)
    } else {
      setHidden(e.target.value === false)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>

      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label> Change Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Description of note here.... '
            required >
          </input>
        </label>
      </div>
      <div>
        <label> Need to update your advice?
          <div>
            <textarea
              name='noteTextArea'
              id='noteTextArea'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Enlighten us with your wisdom'
              required >
            </textarea>
          </div>
        </label>
      </div>
      <div>
        <label> Would you like remain public/hidden?
          <input
            type='checkbox'
            value={hidden}
            onChange={(e) => handleChange(e)}>
          </input>
        </label>
      </div>
      <button type='submit'> Publish My Thoughts!</button>
    </form>
  )
}

export default NoteEditPage;
