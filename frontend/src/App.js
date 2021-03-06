import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import NotebooksPage from './components/NotebooksPage';
import NoteBooksIDPage from "./components/NoteBooksIDPage";
import CreateNotePage from './components/CreateNotePage';
import NotesPage from "./components/NotesPage";
import CreateNotebookPage from './components/CreateNotebookPage'
import EditNoteBookPage from './components/EditNoteBookPage';
import NotesEditPage from './components/NotesEditPage'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <NotebooksPage />
          </Route>
          <Route exact path='/notebooks'>
            <CreateNotebookPage />
          </Route>
          <Route exact path='/notebooks/:notebookId'>
            <NoteBooksIDPage />
          </Route>
          <Route exact path='/notes/:noteBookId'>
            <CreateNotePage />
          </Route>
          <Route exact path='/notebooks/:noteBookId/edit'>
            <EditNoteBookPage />
          </Route>
          <Route exact path='/notes/:noteId/edit'>
            <NotesEditPage />
          </Route>
          <Route exact path="/note/:noteId">
            <NotesPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
