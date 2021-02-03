import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './style/Login.scss';
// import { useToasts } from 'react-toast-notifications';
import useLocalStorage from 'use-local-storage';

import API from '../services/API';

const Login = (props) => {
  // const { addToast } = useToasts();

  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [isLogged, setIsLogged] = useLocalStorage('isLogged', false);
  const [stayConnected, setStayConnected] = useState(false);
  const required = 'Veuillez saisir une adresse e-mail valide';
  const requiredPassword = 'Veuillez saisir votre mot de passe';

  const errorMessage = (error) => {
    return <div className="invalid-feedback">{error}</div>;
  };
  useEffect(() => {
    if (isLogged === false) {
      history.push('/');
    } else {
      history.push('/home');
    }
  }, [isLogged]);
  const onSubmit = (data) => {
    API.post('/login', data)
      .then(() => {
        setIsLogged(true);
        // addToast('logged in successfully', {
        //   appearance: 'success',
        //   autoDismiss: true,
        // });
        props.history.push('/feed');
      })
      .catch(() => {
        // addToast('Vos acces ne sont pas valides', {
        //   appearance: 'error',
        //   autoDismiss: true,
        // });
      });
    setPassword('');
  };

  return (
    <div className="containerLogin">
      <div className="logo" />
      <div className="boxLogin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email &&
              errors.email.type === 'required' &&
              errorMessage(required)}

            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              className="form-control"
              type="password"
              placeholder="Mot de passe"
              name="password"
              ref={register({ required: true })}
            />
            {errors.password &&
              errors.password.type === 'required' &&
              errorMessage(requiredPassword)}
            <div className="stay-connected-container">
              <div className="stay-connected">
                <label htmlFor="stayConnected">
                  <input
                    ref={register}
                    name="stayConnected"
                    id="stayConnected"
                    type="checkbox"
                    value={stayConnected}
                    onClick={() => setStayConnected(true)}
                  />
                  Rester connecté(e)
                </label>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="button">
                connexion
              </button>
              <div className="infoCreation">
                <p>
                  La création de votre espace peut prendre jusqu'à 72h à compter
                  de la réception de l'adhésion.
                </p>
              </div>
              <div className="forgotten-password">
                Mot de passe oublié ?{' '}
                <a className="email-admin" href="mailto:contact@oufgarden.com">
                  Contacter Ouf!
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
