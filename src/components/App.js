import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

import { LoginProvider } from './_context/LoginContext';

function App() {
  return (
    <LoginProvider>
      <Router>
        <div className="app">
          {/* <Header /> */}
          <main>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;
