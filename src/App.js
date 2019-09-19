import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import LoadingComponent from './components/LoadingComponent'
import './App.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

const Login = React.lazy(() => import('./views/Login/Login'));
const Signup = React.lazy(() => import('./views/Signup'));
const ForgotPassword = React.lazy(() => import('./views/ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./views/ForgotPassword/ResetPassword'));
const Page404 = React.lazy(() => import('./views/Page404'));
const Page500 = React.lazy(() => import('./views/Page500'));
const Group = React.lazy(() => import('./views/Group'));

axios.defaults.baseURL='http://localhost:8080/api'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={<LoadingComponent />}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/signup" name="Signup Page" render={props => <Signup {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/forgot-password" name="Forgot Password" render={props => <ForgotPassword {...props}/>}/>
              <Route exact path="/reset-password" name="Reset Password" render={props => <ResetPassword {...props}/>}/>
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> 
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
