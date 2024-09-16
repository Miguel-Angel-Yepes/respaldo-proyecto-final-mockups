import React from 'react';
import { Image } from 'semantic-ui-react';
import { image } from '../../../../assets';
import './Footer.css';

export function Footer() {
  return (
    <div className='main-box'>
      <div className='image-container-act'>
        <Image src={image.LogoServimascotascolor} as="a" href="/" className='client-menu__Image'/>
        <div className='footer-copyright'>
          <p className='copy'>Copyright © 2024 ServiMascotas - Todos los derechos reservados</p>
        </div>
      </div>

      <div className='email-address'>
        <div>
          <h4>Servimascotas</h4>
          <h5> servimascotasducado@gmail.com</h5>
        </div>
        <div>
          <h4>Dirección</h4>
          <h5> Calle 66 #59-4 Barrio Ducado Bello </h5>
        </div>
      </div>

      <div className='hour-phone'>
        <div>
          <h4>Horario de Atención</h4>
          <h5> Lunes a Sábado | 9:00 am - 8:00 pm</h5>
        </div>
        <div>
          <h4>Teléfono</h4>
          <h5>+57 3012534030</h5>
        </div>
      </div>
    </div>
  );
}