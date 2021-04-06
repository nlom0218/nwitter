import React, { useEffect, useState } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
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
    login: (user, id, displayName) => dispatch({ type: "LOGIN", user, id, displayName })
  }
}

function App({ login }) {
  const [init, setInit] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        login(user.email, user.uid, user.displayName);
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
      setInit(true)
    })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser
    login(user.email, user.uid, user.displayName)
  }
  return (
    <>
      {init ? <AppRouter isLogged={isLogged} refreshUser={refreshUser} /> : <div>It's Loading ...</div>}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
