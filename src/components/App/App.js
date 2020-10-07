import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import AuthScreen from '../AuthScreen/AuthScreen'
import Dashboard from '../Dashboard/Dashboard'
import {routes} from '../../config'
import About from '../About/About'
import Transactions from '../Dashboard/Transactions/Transactions'
import Categories from '../Dashboard/Categories/Categories'
import Navigation from '../Navigation/Navigation'


const App = () => {
    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    const redirectPath = isAuthorized ? routes.dash : routes.auth

    return (
        <div>
            <Router>
                <Navigation />
                <Switch>
                    <Route exact path={routes.base}>
                        <Redirect to={redirectPath}/>
                    </Route>
                    <Route path={routes.auth}>
                        <AuthScreen/>
                    </Route>
                    <Route path={routes.logout}>
                        <AuthScreen logout/>
                    </Route>
                    <Route path={routes.dash}>
                        <Dashboard/>
                    </Route>
                    <Route path={routes.transactions}>
                        <Transactions/>
                    </Route>
                    <Route path={routes.categories}>
                        <Categories/>
                    </Route>
                    <Route path={routes.about}>
                        <About/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App