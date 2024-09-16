import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { ContactNetwork } from '../ContactNetwork';
import './ContactApi.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 6.3471929,
  lng: -75.563069,
};

export function ContactApi() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAtCnsLPzLHTT6NU3rZZ2BsAYzmxmmNbeU',
  });

  return (
    <div className='all-elements'>
      <p className='all-elements-p'>En este apartado tendrás la posibilidad de conocer nuestra ubicación además de encontrar todas nuestras redes sociales</p>
      <div className='boxes'>
        <div className='map'>
          {isLoaded && (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
              <Marker position={center} /> 
            </GoogleMap>
          )}
        </div>
        <div className='networks'>
          <div className='networks-icons'>
            <p>El Ducado Bello</p>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color="#FF5733" />
              <span> Calle 66 #59-4 Barrio Ducado-Bello</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} size="2x" color="#4CAF50" />
              <span> +57 3012534030</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} size="2x" color="#0000FF" />
              <span> Lunes a sábado | 9:00am - 8:00pm</span>
            </div>
          </div>
          <div className='contact-element'>
            <ContactNetwork />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactApi;  