import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="app">
        {/* <Header /> */}
        <main>
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
