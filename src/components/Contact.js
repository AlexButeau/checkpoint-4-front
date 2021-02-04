/* eslint-disable import/order */

import React, { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import { FaPaw, FaCommentAlt } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
// import { BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import Header from './Header';
import { getEntity, makeEntityAdder } from '../services/API';
import { LoginContext } from './_context/LoginContext';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import './style/Contact.scss';

const Contact = (props) => {
  const { addToast } = useToasts();
  // eslint-disable-next-line react/destructuring-assignment
  const { rideDetails } = props.location.state;
  const [message, setMessage] = useState('');

  const [currentUserDetails, setCurrentUserDetails] = useState(undefined);
  const [contactedUserDetails, setContactedUserDetails] = useState(undefined);
  const { userDetails } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    getEntity('users', rideDetails.user_id).then((res) =>
      setContactedUserDetails(res)
    );
    getEntity('users', userDetails.id).then((res) =>
      setCurrentUserDetails(res)
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      currentUser_email: currentUserDetails.email,
      currentUser_firstname: currentUserDetails.firstname,
      currentUser_lastname: currentUserDetails.lastname,
      contactedUser_email: contactedUserDetails.email,
      contactedUser_firstname: contactedUserDetails.firstname,
      contactedUser_lastname: contactedUserDetails.lastname,
      ride_start_city: rideDetails.start_city,
      ride_arrival_city: rideDetails.arrival_city,
      ride_start_date: rideDetails.start_date,
      message,
    };

    try {
      await makeEntityAdder('sendEmail')(data);
      addToast('Message envoyé !', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/rides');
    } catch (err) {
      console.log(err);
      addToast("Problème lors de l'envoi du message", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="contact-page-container">
      <Header />
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <div className="outer-container">
          <div className="ride-details">
            <h2 className="user-infos">
              Trajet proposé par <br />
              {rideDetails.user_firstname} {rideDetails.user_lastname}
            </h2>

            <div className="ride-cities">
              <div className="city-details">
                <h3>
                  {rideDetails.start_city}, {rideDetails.start_zipcode}
                </h3>
                <p className="date-time">
                  {dayjs(rideDetails.start_date.split('T')[0])
                    .locale('fr')
                    .format('DD MMM')}{' '}
                  | {rideDetails.start_time.slice(0, 5)}
                </p>
                <p className="address">{rideDetails.start_address}</p>
              </div>

              <div className="city-details">
                <h3>
                  {rideDetails.arrival_city}, {rideDetails.arrival_zipcode}
                </h3>
                <p className="address">{rideDetails.arrival_address}</p>
              </div>
            </div>

            <div className="ride-infos">
              <div className="species-list">
                <p className="category">
                  <FaPaw
                    size={20}
                    style={{ marginRight: '5px', fill: 'snow' }}
                  />
                  Animaux acceptés
                </p>
                <ul>
                  {rideDetails.acceptedSpeciesNameArray.map((species) => (
                    <li key={species}>{species}</li>
                  ))}
                </ul>
              </div>

              <div className="transport">
                <p className="category">
                  <AiFillCar
                    size={25}
                    style={{ marginRight: '5px', fill: 'snow' }}
                  />
                  Type de transport
                </p>
                {rideDetails.transport_name}
              </div>
              <div className="comment">
                <p className="category">
                  <FaCommentAlt
                    size={18}
                    style={{ marginRight: '5px', fill: 'snow' }}
                  />
                  Commentaire
                </p>
                {rideDetails.comment}
              </div>
            </div>
          </div>

          <div className="contact-form">
            {currentUserDetails && contactedUserDetails && (
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="message">
                  Votre message
                  <textarea
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                    className="input message"
                    name="message"
                  >
                    Donnez quelques détails au conducteur
                  </textarea>
                </label>

                <input type="submit" value="Envoyer" />
              </form>
            )}
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Contact;
