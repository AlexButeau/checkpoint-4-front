import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { FaPaw, FaCommentAlt } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import Header from './Header';

import { getCollection } from '../services/API';
import './style/RidesList.scss';

require('dayjs/locale/fr');

const RidesList = () => {
  const [ridesList, setRidesList] = useState([]);
  const [start, setStart] = useState('');
  const [arrival, setArrival] = useState('');

  useEffect(async () => {
    const rides = await getCollection('rides');
    setRidesList(rides);
  }, []);

  const handleSubmit = async () => {
    const selectedData = await getCollection('rides', {
      start_city: start,
      arrival_city: arrival,
    });

    setRidesList(selectedData);
  };

  return (
    <div className="rides-list-page">
      <Header />
      <div className="rides-list-page-container">
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <div className="search-section">
            <form onSubmit={() => handleSubmit()}>
              <label htmlFor="start">
                Départ
                <input
                  onChange={(event) => setStart(event.target.value)}
                  value={start}
                  className="input-search"
                  type="text"
                  placeholder="Départ"
                  name="start"
                />
              </label>
              <label htmlFor="arrival">
                Arrivée
                <input
                  onChange={(event) => setArrival(event.target.value)}
                  value={arrival}
                  className="input-search"
                  type="text"
                  placeholder="Arrivée"
                  name="arrival"
                />
              </label>

              <input type="submit" value="Rechercher" />
            </form>
          </div>

          <div className="rides-list">
            <h2>Trajets disponibles</h2>
            {ridesList.length > 0 &&
              ridesList.map((ride) => {
                return (
                  <div className="ride-card" key={ride.id}>
                    <div className="date-time">
                      <p className="date">
                        {dayjs(ride.start_date.split('T')[0])
                          /*  .locale('fr') */
                          .format('DD MMM')}
                      </p>
                      <p className="time">{ride.start_time.slice(0, 5)}</p>
                    </div>
                    <div className="wrapper-right">
                      <p className="user-infos">
                        {ride.user_firstname} {ride.user_lastname}
                      </p>
                      <div className="ride-infos">
                        <p className="start-arrival">
                          <span className="city start_city">
                            {ride.start_city}, {ride.start_zipcode}
                          </span>{' '}
                          <BsArrowRight
                            size={20}
                            style={{
                              marginRight: '5px',
                              marginLeft: '5px',
                              fill: 'black',
                            }}
                          />
                          <span className="city arrival_city">
                            {ride.arrival_city}, {ride.arrival_zipcode}
                          </span>
                        </p>

                        <p className="species-list">
                          <p className="category">
                            <FaPaw
                              size={20}
                              style={{ marginRight: '5px', fill: 'teal' }}
                            />
                            Animaux acceptés
                          </p>
                          <ul>
                            {ride.acceptedSpeciesNameArray.map((species) => (
                              <li key={species}>{species}</li>
                            ))}
                          </ul>
                        </p>

                        <p className="transport">
                          <p className="category">
                            <AiFillCar
                              size={25}
                              style={{ marginRight: '5px', fill: 'teal' }}
                            />
                            Type de transport
                          </p>
                          {ride.transport_name}
                        </p>
                        <p className="comment">
                          <p className="category">
                            <FaCommentAlt
                              size={18}
                              style={{ marginRight: '5px', fill: 'teal' }}
                            />
                            Commentaire
                          </p>
                          {ride.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default RidesList;
