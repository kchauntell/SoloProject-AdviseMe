import React, { useState } from 'react';
import * as noteActions from '../../store/note';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './CreateNotePage.css';

function CreateNotePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [note, setNote] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async(e) => {
    e.preventDefault();

    const payload = {
      note,
      privacy
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <label> Would you like to keep this a secret?
          <select>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>
      </div>
      <button type='submit'> Publish My Thoughts!</button>
    </form>
  )
}
export default CreateNotePage;
