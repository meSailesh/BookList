import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from './components/Edit';
import Show from './components/Show';
import Create from './components/Create';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';

ReactDOM.render(
<Router>
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/show/:id" component={Show} />
    </Switch>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
