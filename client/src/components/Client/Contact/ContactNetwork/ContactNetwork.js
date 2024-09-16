import React from 'react';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NETWORK } from '../../../../utils';
import { faTiktok, faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './ContactNetwork.css';

export function ContactNetwork() {
  return (
    <div className='contact-network'>
      <h2>Encuentranos en nuestras redes!!</h2>

      <div className='contact-network__networks'>
        <Button 
          as="a" 
          href={NETWORK.TIKTOK} 
          target="_blank" 
          className='tiktok-button'
        >
           <FontAwesomeIcon icon={faTiktok} size="2x" color='white' />
        </Button>

        <Button 
          as="a" 
          href={NETWORK.FACEBOOK} 
          target="_blank"
          className='facebook-button'
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" color='white' />
        </Button>

        <Button 
          as="a" 
          href={NETWORK.INSTAGRAM} 
          target="_blank"
          className='instagram-button'
        > 
          <FontAwesomeIcon icon={faInstagram} size="2x" color='white' />
        </Button>

        <Button 
          as="a" 
          href={NETWORK.WHATSAPP} 
          target="_blank" 
          className='whatsapp-button'
        >
          <FontAwesomeIcon icon={faWhatsapp} size="2x" color='white' />
        </Button>
      </div>
    </div>
  )
}