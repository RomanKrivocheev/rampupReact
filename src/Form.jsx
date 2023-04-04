import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import { LoginAnto } from './LoginAnto';

const Form = ({ setIsLogged, user}) => {
  const logOutFunction = () => {
    setIsLogged(false);
  };
  return (
    <>
      <div>
        <h1>BienvenidE {user.username} </h1>
        <button onClick={logOutFunction} type="button" className="btn btn-primary">
          
          Log Out
        </button>
      </div>
    </>
  );
};

export { Form };
