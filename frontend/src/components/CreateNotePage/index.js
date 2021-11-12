import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as noteActions from '../../store/note';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './CreateNotePage.css';

function CreateNotePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [note, setNote] = useState('');
  const [_private, setPrivate] = useState();
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    setNote(note);
    setPrivate(_private);
    e.preventDefault();

    if(!note) {
      return dispatch(noteActions.createNote({_private, note}))
    }

    // setNote(note);
    // setPrivate(_private);

    // const payload = {
    //   note,
    //   _private
    // }
    history('/notes');
  }

  const handleChange = (e) => {
    let checkbox = e.target;
    if(checkbox.checked) {
      setPrivate(e.target.value === true)
    } else {
      setPrivate(e.target.value === false)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit()}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label> What is your advice?
          <textarea
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
          value={_private}
          onChange={(e) => handleChange(e)}>
          </input>
        </label>
      </div>
      <button type='submit'> Publish My Thoughts!</button>
    </form>
  )
}
export default CreateNotePage;
