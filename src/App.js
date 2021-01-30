import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Chats from './Components/Chats/Chats';
import ChatView from './Components/ChatView/ChatView';
import Login from './Components/Login/Login';
import Preview from './Components/Preview/Preview';
import WebcamCapture from './Components/WebcamCapture/WebcamCapture';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          dispatch(login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid
          }))
        } else {
          dispatch(logout());
        }
      })
  }, []);

  return (
    <div className="app">
      <Router>

        {!user ? (
          <Login />
        ) : (
            <>
              <div className='app__body'>
                <div className="app__bodyBackground">
                  <Switch>

                    <Route path='/chats/view'>
                      <ChatView />
                    </Route>

                    <Route path='/chats'>
                      <Chats />
                    </Route>

                    <Route path='/preview'>
                      <Preview />
                    </Route>

                    <Route exact path='/'>
                      <WebcamCapture />
                    </Route>
                  </Switch>
                </div>

              </div>
            </>
          )}

      </Router>


    </div>
  );
}

export default App;
