import { createHashHistory } from 'history';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import KanbanBoard from './components/KanbanBoard';

export const history = createHashHistory();
const AppRouter = () => {
    return (
        < HashRouter history={history} >
            <div>
                <Switch>
                    <Route to="/" component={KanbanBoard} exact />
                </Switch>
            </div>
        </HashRouter >
    )
}
export default AppRouter;