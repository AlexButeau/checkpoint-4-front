/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
// import { TimeInput } from './TimeInput';

import Header from './Header';
import { getCollection, makeEntityAdder } from '../services/API';
import { LoginContext } from './_context/LoginContext';

import './style/RideCreation.scss';

const RideCreation = () => {
  const [transportOptions, setTransportOptions] = useState([]);
  const [speciesList, setSpeciesOptions] = useState([]);

  const [start_city, setStartCity] = useState('');
  const [start_zipcode, setStartZipcode] = useState('');
  const [start_address, setStartAddress] = useState('');
  const [start_date, setStartDate] = useState('');
  const [start_time, setStartTime] = useState();

  const [arrival_city, setArrivalCity] = useState('');
  const [arrival_zipcode, setArrivalZipcode] = useState('');
  const [arrival_address, setArrivalAddress] = useState('');

  const [comment, setComment] = useState('');

  const [transport_id, setTransportId] = useState();

  const [accepted_species_array, setAcceptedSpeciesArray] = useState([]);

  const { userDetails } = useContext(LoginContext);

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

  const handleSelectSpeciesChange = (elem) => {
    if (!elem) {
      setAcceptedSpeciesArray([]);
      //   setData((prevState) => ({ ...prevState, garden: [] }));
    } else {
      setAcceptedSpeciesArray(elem.map((e) => e.value));
      //   setData((prevState) => ({ ...prevState, garden: [...elem] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      start_city,
      start_zipcode,
      start_address,
      start_date,
      start_time: `${start_time}:00`,
      arrival_city,
      arrival_zipcode,
      arrival_address,
      transport_id,
      comment,
      accepted_species_array,
      user_id: userDetails.id,
    };

    try {
      await makeEntityAdder('rides')(data);
      setTransportOptions([]);
      setSpeciesOptions([]);
      setStartCity('');
      setStartZipcode('');
      setStartAddress('');
      setStartDate('');
      setStartTime('');
      setArrivalCity('');
      setArrivalZipcode('');
      setArrivalAddress('');
      setComment('');
      setTransportId();
      setAcceptedSpeciesArray([]);
      // here redirect
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ride-creation-page">
      <Header />
      <div className="ride-creation-wrapper">
        <div className="image-wrapper">
          <div className="image" />
        </div>

        <div className="form-wrapper">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="start_address">
              Addresse de départ
              <input
                onChange={(event) => setStartAddress(event.target.value)}
                value={start_address}
                className="input-search"
                type="text"
                placeholder="ex: 12 rue du départ"
                name="start_address"
                required
              />
            </label>
            <label htmlFor="start_city">
              Ville de départ
              <input
                onChange={(event) => setStartCity(event.target.value)}
                value={start_city}
                className="input-search"
                type="text"
                placeholder="ex: Lyon"
                name="start_city"
                required
              />
            </label>
            <label htmlFor="start_zipcode">
              Code postal de départ
              <input
                onChange={(event) => setStartZipcode(event.target.value)}
                value={start_zipcode}
                className="input-search"
                type="text"
                placeholder="ex: 69004"
                name="start_zipcode"
                required
              />
            </label>
            <label htmlFor="start_date">
              Date de départ
              <input
                onChange={(event) => setStartDate(event.target.value)}
                value={start_date}
                className="input-search"
                type="date"
                name="start_date"
                required
              />
            </label>
            <label htmlFor="start_time">
              Heure de départ (hh:mm)
              <input
                onChange={(event) => setStartTime(event.target.value)}
                value={start_time}
                className="input-search"
                type="text"
                name="start_time"
                required
              />
            </label>

            <label htmlFor="arrival_address">
              Addresse d'arrivée
              <input
                onChange={(event) => setArrivalAddress(event.target.value)}
                value={arrival_address}
                className="input-search"
                type="text"
                placeholder="ex: 24 rue du puits"
                name="arrival_address"
                required
              />
            </label>
            <label htmlFor="arrival_city">
              Ville d'arrivée
              <input
                onChange={(event) => setArrivalCity(event.target.value)}
                value={arrival_city}
                className="input-search"
                type="text"
                placeholder="ex : Paris"
                name="arrival_city"
                required
              />
            </label>
            <label htmlFor="arrival_zipcode">
              Code postal d'arrivée
              <input
                onChange={(event) => setArrivalZipcode(event.target.value)}
                value={arrival_zipcode}
                className="input-search"
                type="text"
                placeholder="ex: 75008"
                name="arrival_zipcode"
                id="arrival_zipcode"
                required
              />
            </label>
            <label htmlFor="transport_id">
              Mode de transport :{' '}
              <select
                required
                name="transport_id"
                value={transport_id}
                onChange={(e) => setTransportId(+e.target.value)}
              >
                {transportOptions.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.transport}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="species">
              Animaux acceptés
              <Select
                isMulti
                required
                id="species"
                name="species"
                defaultValue=""
                placeholder="Choix des animaux acceptés"
                options={speciesOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => {
                  handleSelectSpeciesChange(e);
                }}
              />
            </label>

            <label htmlFor="message">
              Commentaire
              <textarea
                onChange={(event) => setComment(event.target.value)}
                value={comment}
                className="input message"
                name="message"
              >
                Votre commentaire
              </textarea>
            </label>
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RideCreation;
