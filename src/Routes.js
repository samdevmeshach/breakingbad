import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './pages/home'
import Character from './pages/character'
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/character/:characterId" exact component={Character} />
            </Switch>
        </BrowserRouter>
    );
}


export default Routes;
