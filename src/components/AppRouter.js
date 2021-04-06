import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigaton from './Navigation';


const AppRouter = ({ isLogged, refreshUser }) => {
    return (
        <Router>
            {isLogged && <Navigaton />}
            <Switch>
                {isLogged ?
                    <div
                        style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <Route exact path="/"><Home /></Route>
                        <Route path="/profile"><Profile refreshUser={refreshUser} /></Route>
                    </div>
                    :
                    <Route exact path="/"><Auth /></Route>
                }
            </Switch>
        </Router>
    );
}

export default AppRouter;