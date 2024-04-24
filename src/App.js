import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Modifier } from './component/Modifier';
import { Liste } from './component/Liste';
import { Ajouter } from './component/Ajouter'
import { Accueil } from './component/Accueil';
import { Navigation } from './component/Navigation';
import { AjouterP } from './component/AjouterP';

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <main>
        <Router>
          <Switch>          
            <Route exact path="/" component={Accueil} />
            <Route path="/ajouter" component={Ajouter} />
            <Route path="/liste" component={Liste} />
            <Route path="/modifier" component={Modifier} />
            <Route path="/ajouterP" component={AjouterP} />
          </Switch>
        </Router>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
