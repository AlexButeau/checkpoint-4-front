import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

import { LoginProvider } from './_context/LoginContext';

function App() {
  return (
    <LoginProvider>
      <ToastProvider placement="top-right">
        <Router>
          <div className="app">
            {/* <Header /> */}
            <main>
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                {/* <Route exact path="/home">
                <Home />
              </Route> */}
                <ProtectedRoute exact path="/home" component={Home} />
              </Switch>
            </main>
          </div>
        </Router>
      </ToastProvider>
    </LoginProvider>
  );
}

export default App;
