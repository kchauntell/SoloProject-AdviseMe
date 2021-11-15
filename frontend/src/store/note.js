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

const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  noteId
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

export const removeNote = (noteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const note = await response.json();
    dispatch(deleteNote(note.id));
  }
}

const initialState = {};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_LOAD: {
      const allNotes = {};
      action.notes.forEach((note) => {
        // console.log(note.id);
        allNotes[note.id]= note;
        // console.log(allNotes);
      });
      return {
        ...allNotes,
        ...state
      }
    }
    case ADD_NOTE: {
      let newState = {...state};
      if(!state[action.newNote.id]) {
        newState = {
          ...state,
          [action.newNote.id]: action.newNote
        };
        newState[action.newNote.id] = action.newNote
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
    case DELETE_NOTE: {
      const newState = {...state};
      delete newState[action.noteId];
      return newState
    }
    default:
    return state;
  }
}
export default noteReducer
