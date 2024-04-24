import React from 'react';
import '../styles/App.css';

export const Navigation = () => {
  return ( 
    <nav className ="navbar">
        <ul>
          <li className="active">
            <a href="/">Accueil</a>
          </li>
          <li className="active">
            <a href="/liste">Liste</a>
          </li>
        </ul>
    </nav>
  );
}