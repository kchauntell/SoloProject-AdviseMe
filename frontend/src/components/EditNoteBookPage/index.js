import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as noteBookActions from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getNotebook } from '../../store/notebook';
import './EditNoteBookPage.css';


const categories = [
  'Relationships',
  'Platonic Relationships',
  'School/Environment',
  'Work Environment/Relationships'
]

function EditNoteBookPage() {
  const dispatch = useDispatch();
  const { noteBookId } = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Relationships');
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '') {
      return
    }

    const newNotebook = await dispatch(noteBookActions.createNotebook({ hidden, title, genre, userId: sessionUser.id }))
    history.push(`/`);
  }

  console.log(noteBookId, '-----------');

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
            placeholder='Name your Notebook here.... '
            required >
          </input>
        </label>
      </div>
      <div>
        <label> Change Book Genre?
          <div>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder='Enlighten us with your wisdom'
              required >
              {categories.map((category) => {
                return (<option>{`${category}`}</option>)
              })}
            </select>
          </div>
        </label>
      </div>
      <div>
        <label> Would you like remain unhidden/hidden?
          <input
            type='checkbox'
            value={hidden}
            onChange={(e) => handleChange(e)}>
          </input>
        </label>
      </div>
      <button type='submit'> Create My Notebook!</button>
    </form>
  )
}


export default EditNoteBookPage;
