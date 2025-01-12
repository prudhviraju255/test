import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route,Link,BrowserRouter as Router} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';

const routing=(
    <Router>
        <div>
        <Route path="/" component={Signup}/>
            <Route path="/login" component={Login}/>
            {/* <Route component={Notfound}/> */}
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
