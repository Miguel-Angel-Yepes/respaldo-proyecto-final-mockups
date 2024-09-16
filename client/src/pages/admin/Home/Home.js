import React from 'react';
import { Image } from 'semantic-ui-react';
import { image } from '../../../assets';
import { useAuth } from '../../../hooks';
import styles from './Home.module.css';

export function Home() {

  const {user} = useAuth();

  return (
    <div className={styles.welcome}>
      <Image src={image.LogoServimascotascolor} className={styles.welcomeImage}/>
      <h2>Hola {user.firstname}, Bienvenido al panel de administrador</h2>
    </div>
  )
}
