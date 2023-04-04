import React, { useState } from 'react';
import { LoginAnto } from './LoginAnto';
import { Formulario } from './Formulario';
import {CreateNewP} from './CreateNewP'

const MainProgram = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  return (
    <>
      {!isLogged ? (
        <LoginAnto setIsLogged={setIsLogged} setUser={setUser} />
      ) : (
       <Formulario setIsLogged={setIsLogged} user={user}/>
      )}
    </>
  );
};

export { MainProgram };
