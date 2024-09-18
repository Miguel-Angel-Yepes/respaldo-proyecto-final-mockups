import React, { useState } from 'react';
import { RegisterForm, LoginFormAdmin } from '../../../components/admin/Auth';
import './Auth.css';

export function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin(!showLogin);

  return (
    <div className='auth'>      
      {showLogin ? (
        <>
          <LoginFormAdmin openRegister={toggleForm}/>
        </>
      ) : (
        <>
          <RegisterForm openLogin={toggleForm} />
        </>
      )}
    </div>
  );
}