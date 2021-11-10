import { csrfFetch } from './csrf';

const LOAD = 'notebook/load'

const load = (notebooks) => {
  return {
    type: LOAD,
    notebooks
  }
}

export const getNotebook = () => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks`);
  console.log(response);

  if(response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
}

const initialState = {}

const notebookReducer = (state =initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allNotebooks = {};
      action.notebooks.forEach((notebook) => {
        // console.log(notebook.id);
        allNotebooks[notebook.id] = notebook;
        console.log(notebook);
      });
      return {
        ...allNotebooks,
        ...state,
      }
    }
    default:
      return state;
  }
}

export default notebookReducer;
