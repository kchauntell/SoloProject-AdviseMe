import { csrfFetch } from './csrf';

const NOTE_LOAD = 'note/LOAD'
const ADD_NOTE = 'note/ADD_NOTE'
const DELETE_NOTE = 'note/DELETE_NOTE'

const load = (notes) => {
  return {
    type: NOTE_LOAD,
    notes
  }
}

const addNote = (newNote) => ({
  type: ADD_NOTE,
  newNote
})

const deleteNote = (note) => ({
  type: DELETE_NOTE,
  note
})


export const getNote = () => async (dispatch) => {
  const response = await csrfFetch(`/api/notes`);

  if(response.ok) {
    const noteList = await response.json();
    dispatch(load(noteList));
  }
}

export const createNote = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const publishNote = await response.json();
    dispatch(addNote(publishNote));
    return publishNote;
  }
}

const initialState = {};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_LOAD: {
      const allNotes = {};
      action.notes.forEach((note) => {
        console.log(note.id);
        allNotes[note.id]= note;
        console.log(allNotes);
      });
      return {
        ...allNotes,
        ...state
      }
    }
    case ADD_NOTE: {
      if(!state[action.note.id]) {
        const newState = {
          ...state,
          [action.newNote.id]: action.newNote
        };
        const noteList = newState.notes.map((id) => newState[id]);
        noteList.push(action.newNote);
        newState.notes = noteList;
        return newState;
      }
      return {
        ...state,
        [action.newNote.id]: {
          ...state[action.newNote.id],
          ...action.newNote
        }
      }
    }
    default:
    return state;
  }
}
export default noteReducer
