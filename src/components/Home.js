import React from 'react';
import Header from './Header';
import './style/Home.scss';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="dog-photo" />
      <div className="action-list">
        <div className="action-card">
          <p className="action-text">
            Vous voulez aider une association à concrétiser une adoption dans
            une autre région, ou un particulier à transporter son animal en
            toute sécurité ?
          </p>
          <div className="action-button">Proposer un trajet</div>
        </div>
        <div className="action-card">
          <p className="action-text">
            Vous êtes une association ou un particulier et vous avez besoin d'un
            trajet pour votre animal ?
          </p>
          <div className="action-button">Voir les trajets disponibles</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
