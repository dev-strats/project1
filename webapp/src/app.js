// bootstrap
import 'jquery';
import 'bootstrap-loader';
import "./assets/css/bootstrap-theme.min.css";

// font-awesome
import "font-awesome/css/font-awesome.min.css";

// material-design-iconic-font
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";


import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import routes from './router-config';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers } from 'redux';
import { fontSizeBase, secondTextColor, fontFamilyBase, second_color, baseColor } from './config';
import { NoMatch } from './components';
import Auth from './auth';
import Layout, { reducer } from './layout-container';
import LayoutPublic from './layout-public';
import {muiTheme} from './config';

// Stylesheets
import './assets/css/main.css';
import './assets/css/style.css';
import './assets/css/custom.css';
import './assets/css/media.css';


// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        app: reducer,
        routing: routerReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isUserAuthenticated() ? (
                <Layout {...props}>
                    <Component {...props}/>
                </Layout>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
    )}/>
)

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <LayoutPublic {...props}>
            <Component {...props}/>
        </LayoutPublic>
    )}/>
)

class App extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {routes.map((route,i) => (
                            route.private ? 
                            <PrivateRoute key={i} {...route}/>  
                            : 
                            <PublicRoute key={i} {...route}/>
                        ))}
                        <Route component={NoMatch}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('main'))
