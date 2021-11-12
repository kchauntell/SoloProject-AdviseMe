import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import NotebooksPage from './components/NotebooksPage';
import NoteBooksIDPage from "./components/NoteBooksIDPage";
import CreateNotePage from './components/CreateNotePage';
import NotesPage from "./components/NotesPage";
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
          <Route exact path='/notebooks/:notebookId'>
            <NoteBooksIDPage />
          </Route>
          <Route exact path='/notes'>
            <CreateNotePage />
          </Route>
          <Route path="/notes/:id">
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
