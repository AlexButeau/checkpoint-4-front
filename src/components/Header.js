/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext } from 'react';
import './style/Header.scss';
import { slide as Menu } from 'react-burger-menu';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { AiFillCar, AiFillPlusCircle } from 'react-icons/ai';
import { GiDogHouse } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import API from '../services/API';
import { LoginContext } from './_context/LoginContext';

const Header = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { userDetails, setUserDetails, isLogged, setIsLogged } = useContext(
    LoginContext
  );

  const handleLogOut = async () => {
    try {
      await API.get('/logout');
      await setUserDetails('');
      await setIsLogged(false);
      history.push('/');
      addToast('Déconnexion réussie !', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch {
      addToast('Echec de déconnexion !', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <header>
      {/* <div className="userTitle">
        {userDetails.firstname} {userDetails.lastname}
      </div> */}

      <div className="menuBtn">
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <ul>
            <li>
              <Link to="/home">
                <GiDogHouse
                  size={35}
                  style={{ marginRight: '5px', fill: 'teal' }}
                />
                <span className="desktop">Accueil</span>
              </Link>
            </li>

            <li>
              <Link to="/rides">
                <AiFillCar
                  size={35}
                  style={{ marginRight: '5px', fill: 'teal' }}
                />
                <span className="desktop">Trajets</span>
              </Link>
            </li>

            <li>
              <Link to="/home">
                <AiFillPlusCircle
                  size={35}
                  style={{ marginRight: '5px', fill: 'teal' }}
                />
                <span className="desktop">Proposer un trajet</span>
              </Link>
            </li>
          </ul>
        </IconContext.Provider>
      </div>

      <div className={isLogged ? 'logoutBtn-true' : 'logoutBtn-false'}>
        <Menu right>
          <div id="home" className="menu-item" href="/">
            {/* <BsFillPersonFill size={150} color="white" /> */}
            <p>
              Bonjour {userDetails.firstname} {userDetails.lastname}
            </p>
          </div>
          <Link to="/home">Accueil</Link>
          <div
            className={isLogged ? 'logoutBtn-true' : 'logoutBtn-false'}
            type="button"
            onClick={handleLogOut}
          >
            Déconnexion
          </div>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
