import React, {useState} from 'react';
import { Image, Icon, Button, Modal, Confirm } from 'semantic-ui-react';
import { image } from '../../../../assets';
import { useAuth } from '../../../../hooks';
import { LoginForm, RegisterForm } from '../../../admin/Auth';
import { useNavigate } from 'react-router-dom';   
import styles from './ClientMenu.module.css';

export function ClientMenu(props) {

  const { title } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useNavigate();  // Hook para navegar a otras rutas

  // Función para manejar el redireccionamiento
  const handleRedirect = () => {
    navigate('/');
  };

  const toggleForm = () => setIsLogin(!isLogin);


  const onOpenCloseLogin = () => {
    setShowLogin((prevState) => !prevState);
  }

  const onOpenCloseConfirm = () => {
    setShowConfirm((prevState) => !prevState)
  };

  const onLogout = () => {
    logout();
    onOpenCloseConfirm();
    handleRedirect();
  };

  return (
    <>
    <div className={styles['client-menu']}>
      <Image
        src={image.LogoServimascotasblanco}
        as="a"
        href="/"
        className={styles['client-menu__Image']}
      />

      <h2> {title} </h2>

      {user ? (
        <Button
          className={styles['menu-elements__Button__Login']}
          size="large"
          onClick={onOpenCloseConfirm}
        >
          <Icon name="user" className={styles.userIcon} />
          <p>Hola {user.firstname}</p>
        </Button>
      ) : (
        <Button
          className={styles['menu-elements__Button__Login']}
          size="large"
          onClick={onOpenCloseLogin}
        >
          <Icon name="user" />
          <p>Iniciar sesión</p>
        </Button>
      )}
    </div>

    <Modal closeIcon open={showLogin} onClose={onOpenCloseLogin} className={styles.modal}>
        <Modal.Content className={styles.modalContent}>
          {isLogin ? (
            <LoginForm
              openRegister={toggleForm}
              onOpenCloseLogin={onOpenCloseLogin}
            />
          ) : (
            <RegisterForm
              openLogin={toggleForm}
              onOpenCloseLogin={onOpenCloseLogin}
            />
          )}
        </Modal.Content>
      </Modal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onLogout}
        content="Deseas cerrar la sesión?"
        size="mini"
      />
    </>
  )
}
