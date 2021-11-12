import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as noteActions from '../../store/note';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getNote } from '../../store/note';
import './CreateNotePage.css';

function CreateNotePage() {
  const dispatch = useDispatch();
  const {noteBookId} = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState([]);

  console.log(noteBookId, '-----------');

  useEffect(() => {
    dispatch(getNote());
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(note === '') {
      return
    }

    const newNote = await dispatch(noteActions.createNote({hidden, title, note, noteBookId, userId: sessionUser.id}))
    history.push(`/notebooks/${noteBookId}`);
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
        <label> Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder ='Description of note here.... '
            required >
          </input>
        </label>
      </div>
      <div>
        <label> What is your advice?
          <div>
            <textarea
              name='noteTextArea'
              id='noteTextArea'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder ='Enlighten us with your wisdom'
              required >
            </textarea>
          </div>
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
