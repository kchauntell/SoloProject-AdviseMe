import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as noteActions from '../../store/note';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getNotes } from '../../store/note';
import './CreateNotePage.css';

function CreateNotePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [note, setNote] = useState('');
  const [hidden, setHidden] = useState();
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    setNote(note);
    setHidden(hidden);
    e.preventDefault();

    return dispatch(noteActions.createNote({hidden, note}))

    // setNote(note);
    // setPrivate(_private);

    // const payload = {
    //   note,
    //   _private
    // }
    history.push(`/`);
  }

  const handleChange = (e) => {
    let checkbox = e.target;
    if(checkbox.checked) {
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
        <label> What is your advice?
          <textarea
            name='noteTextArea'
            id='noteTextArea'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder ='Enlighten us with your wisdom'
            required >
          </textarea>
        </label>
      </div>
      <div>
        <label> Would you like to keep this hidden?
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
export default CreateNotePage;
