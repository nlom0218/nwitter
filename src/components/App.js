import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { authService } from '../fbase';
import AppRouter from './AppRouter';

const mapStateToProps = (state) => {
  return {
    changeDisplayName: state.changeDisplayName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, id, displayName, photoURL) => dispatch({ type: "LOGIN", user, id, displayName, photoURL })
  }
}

function App({ login }) {
  const [init, setInit] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        login(user.email, user.uid, user.displayName, user.photoURL);
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
      setInit(true)
    })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser
    login(user.email, user.uid, user.displayName, user.photoURL)
  }
  return (
    <>
      {init ? <AppRouter isLogged={isLogged} refreshUser={refreshUser} /> : <div>It's Loading ...</div>}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
