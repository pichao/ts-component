import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
// import About from 'pages/about';
// import Users from 'pages/users';
// import Home from 'pages/home';
/* 
注意使用lazy引入组件，export应该导出default,且路由组件都需要放在suspend里面
*/

import 'assets/css/variable.css';
const Home = lazy(() => import(/* webpackChunkName: 'Home'*/ 'pages/home'));
const About = lazy(() => import(/* webpackChunkName: 'About'*/ 'pages/about'));
const Users = lazy(() => import(/* webpackChunkName: 'Users'*/ 'pages/users'));
export interface HelloWorldProps {
    userName: string;
    lang: string;
}
export const App = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/about$" component={About}></Route>
                <Route path="/users$" component={Users}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </Router>
    </Suspense>
);
