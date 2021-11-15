import { csrfFetch } from './csrf';

const LOAD = 'notebook/LOAD'
const ADD_NOTEBOOK = 'note/ADD_NOTEBOOK'
const DELETE_NOTE = 'note/DELETE_NOTE'
// const LOAD_NOTE = 'notebook/LOAD_NOTE'

const load = (notebooks) => {
  return {
    type: LOAD,
    notebooks
  }
}

const addNotebook = (newNotebook) => ({
  type: ADD_NOTEBOOK,
  newNotebook
})

export const getNotebook = () => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks`);
  // console.log(response);

  if(response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
}

export const createNotebook = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const publishNotebook = await response.json();
    dispatch(addNotebook(publishNotebook));
    return publishNotebook;
  }
}
// export const getNotes = () => async (dispatch) => {
//   const response = csrfFetch(`/api/notebooks/:id(\\d+)}`);
//   if (response.ok) {
//     const noteList = await response.json();
//     dispatch(load(noteList))
//   }
// }

const initialState = {}

const notebookReducer = (state =initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD: {
      const allNotebooks = {};
      action.notebooks.forEach((notebook) => {
        // console.log(notebook.id);
        allNotebooks[notebook.id] = notebook;
        // console.log(notebook);
      });
      return {
        ...allNotebooks,
        ...state,
      }
    }
    case ADD_NOTEBOOK: {
      newState = { ...state };
      if (!state[action.newNotebook.id]) {
        newState = {
          ...state,
          [action.newNotebook.id]: action.newNotebook
        };
        newState[action.newNotebook.id] = action.newNotebook
        return newState;
      }
      return {
        ...state,
        [action.newNotebook.id]: {
          ...state[action.newNotebook.id],
          ...action.newNotebook
        }
      }
    }
    case DELETE_NOTE: {
      newState = {...state};
      // console.log(action, 'xxxxxxxxxxxxxx')
      let notesIdx= newState[+action.noteId.noteBookId].Notes.findIndex( note => note.id === action.noteId.id)
      // console.log(notesIdx, '00000000000')
      newState[action.noteId.noteBookId].Notes.splice(notesIdx, 1);
      newState[action.noteId.noteBookId].Notes = newState[action.noteId.noteBookId].Notes.slice();
      return newState;
    }
    default:
      return state;
  }
}

export default notebookReducer;
