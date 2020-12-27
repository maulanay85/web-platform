import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';
import Home from './components/pages/Home'
import PokemonOwned from './components/pages/Pokemon-owned';
import PokemonDetail from './components/pages/Pokemon-detail';

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/owned' exact component={PokemonOwned} />
          <Route path='/detail/:id' exact component={PokemonDetail} />
        </Switch>
      </HashRouter>

    </>
  );
}

export default App;
