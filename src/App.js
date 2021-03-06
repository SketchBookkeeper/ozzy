import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Forum from './components/Forum/Forum';
import Welcome from './components/Welcome/Welcome';
import NewPost from './components/NewPost/NewPost';
import Profile from './components/Profile/Profile';
import Map from './components/Map/Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
        <Nav />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/forum" component={Forum} />
            <Route path="/new" component={NewPost} />
            <Route path="/profile" component={Profile} />
            <Route path="/find" component={Map} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
