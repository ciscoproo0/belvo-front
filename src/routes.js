import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Link from './pages/Link';
import Dashboard from './pages/Dashboard';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Link} />
            <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
    );
}

export default Routes;