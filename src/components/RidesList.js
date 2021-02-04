import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { FaPaw, FaCommentAlt } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import Header from './Header';

import { getCollection } from '../services/API';
import './style/RidesList.scss';

require('dayjs/locale/fr');

const RidesList = () => {
  const [transportList, setTransportOptions] = useState([]);
  const [speciesList, setSpeciesOptions] = useState([]);

  const [acceptedSpeciesArray, setAcceptedSpeciesArray] = useState([]);
  const [acceptedTransportArray, setAcceptedTransportArray] = useState([]);

  const [ridesList, setRidesList] = useState([]);
  const [start, setStart] = useState('');
  const [arrival, setArrival] = useState('');

  useEffect(async () => {
    const rides = await getCollection('rides');
    setRidesList(rides);
  }, []);

  useEffect(() => {
    getCollection('transport').then((res) => setTransportOptions(res));
    getCollection('species').then((res) => setSpeciesOptions(res));
  }, []);

  const speciesOptions = speciesList.map((elem) => {
    return {
      value: elem.id,
      label: `${elem.species}`,
    };
  });
  const transportOptions = transportList.map((elem) => {
    return {
      value: elem.id,
      label: `${elem.transport}`,
    };
  });

  const handleSelectSpeciesChange = (elem) => {
    if (!elem) {
      setAcceptedSpeciesArray([]);
      //   setData((prevState) => ({ ...prevState, garden: [] }));
    } else {
      setAcceptedSpeciesArray(elem.map((e) => e.value));
      //   setData((prevState) => ({ ...prevState, garden: [...elem] }));
    }
  };
  const handleSelectTransportChange = (elem) => {
    if (!elem) {
      setAcceptedTransportArray([]);
      //   setData((prevState) => ({ ...prevState, garden: [] }));
    } else {
      setAcceptedTransportArray(elem.map((e) => e.value));
      //   setData((prevState) => ({ ...prevState, garden: [...elem] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedData = await getCollection('rides', {
      start_city: start.toUpperCase(),
      arrival_city: arrival.toUpperCase(),
    });

    setRidesList(selectedData);
  };

  return (
    <div className="rides-list-page">
      <Header />
      <div className="rides-list-page-container">
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <div className="search-section">
            <form onSubmit={(e) => handleSubmit(e)}>
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

            <div className="filters-container">
              <h3>Filtrer</h3>
              <Select
                isMulti
                id="species"
                name="species"
                defaultValue=""
                placeholder="Filtrer par animaux acceptés"
                options={speciesOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => {
                  handleSelectSpeciesChange(e);
                }}
              />
              <Select
                isMulti
                id="transport"
                name="transport"
                defaultValue=""
                placeholder="Filtrer par type de transport"
                options={transportOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => {
                  handleSelectTransportChange(e);
                }}
              />
            </div>
          </div>

          <div className="rides-list">
            <h2>Trajets disponibles</h2>
            {ridesList.length > 0 &&
              ridesList
                .filter((ride) => {
                  if (acceptedSpeciesArray.length > 0) {
                    let result = false;
                    ride.acceptedSpeciesArray.forEach((speciesid) => {
                      if (acceptedSpeciesArray.includes(speciesid)) {
                        result = true;
                      }
                    });
                    return result;
                  }
                  return true;
                })
                .filter((ride) => {
                  if (acceptedTransportArray.length > 0) {
                    return acceptedTransportArray.includes(ride.transport_id);
                  }
                  return true;
                })
                .map((ride) => {
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

                          <div className="species-list">
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
                          </div>

                          <div className="transport">
                            <p className="category">
                              <AiFillCar
                                size={25}
                                style={{ marginRight: '5px', fill: 'teal' }}
                              />
                              Type de transport
                            </p>
                            {ride.transport_name}
                          </div>
                          <div className="comment">
                            <p className="category">
                              <FaCommentAlt
                                size={18}
                                style={{ marginRight: '5px', fill: 'teal' }}
                              />
                              Commentaire
                            </p>
                            {ride.comment}
                          </div>
                          <div className="details-link-wrapper">
                            <div className="details-link">
                              <Link
                                to={{
                                  pathname: `/rides/${ride.id}/contact/`,
                                  state: {
                                    rideDetails: ride,
                                  },
                                }}
                              >
                                Contacter
                              </Link>
                            </div>
                          </div>
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
