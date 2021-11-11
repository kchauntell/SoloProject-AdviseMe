import { csrfFetch } from './csrf';

const LOAD = 'notebook/LOAD'
// const LOAD_NOTE = 'notebook/LOAD_NOTE'

const load = (notebooks) => {
  return {
    type: LOAD,
    notebooks
  }
}

// const loadNote = (notes) => {
//   return {
//     type: LOAD_NOTE,
//     notes
//   }
// }

export const getNotebook = () => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks`);
  // console.log(response);

  if(response.ok) {
    const list = await response.json();
    dispatch(load(list));
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
    // case LOAD_NOTE: {
    //   const allNotes = {}
    //   action.notes.forEach((note) => )
    // }

    default:
      return state;
  }
}

export default notebookReducer;
