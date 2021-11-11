import { csrfFetch } from './csrf';

const NOTE_LOAD = 'note/LOAD'

const load = (notes) => {
  return {
    type: NOTE_LOAD,
    notes
  }
}

export const getNote = () => async (dispatch) => {
  const response = await csrfFetch(`/api/notes`);

  if(response.ok) {
    const noteList = await response.json();
    dispatch(load(noteList));
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
    default:
    return state;
  }
}
export default noteReducer
