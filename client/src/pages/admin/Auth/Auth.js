import React, { useState } from 'react';
import { RegisterForm, LoginForm } from '../../../components/admin/Auth';
import './Auth.css';

export function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin(!showLogin);

  return (
    <div className='auth'>      
      {showLogin ? (
        <>
          <LoginForm openRegister={toggleForm}/>
        </>
      ) : (
        <>
          <RegisterForm openLogin={toggleForm} />
        </>
      )}
    </div>
  );
}