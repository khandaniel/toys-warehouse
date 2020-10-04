import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthScreen from '../AuthScreen/AuthScreen'
import Dashboard from '../Dashboard/Dashboard'

function App() {
    const token = useSelector(state => state.auth.token)
    const redirectPath = token ? '/dash' : '/auth'
    // console.log("App: ", token);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to={redirectPath} />
                </Route>
                <Route path="/auth">
                    <AuthScreen />
                </Route>
                <Route path="/logout">
                    <AuthScreen logout />
                </Route>
                <Route path="/dash">
                    <Dashboard />
                </Route>
            </Switch>
        </Router>
    );
}

export default App