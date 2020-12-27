import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import PokemonOwned from './components/pages/Pokemon-owned';
import PokemonDetail from './components/pages/Pokemon-detail';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path={process.env.PUBLIC_URL + '/'} exact component={Home} />
          <Route path={process.env.PUBLIC_URL + '/owned'} exact component={PokemonOwned} />
          <Route path={process.env.PUBLIC_URL + '/detail/:id'} exact component={PokemonDetail} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
