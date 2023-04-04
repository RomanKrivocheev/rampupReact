import React, { useState } from 'react';
// import { Formulario } from "./Formulario";
import { CreateNewP } from './CreateNewP';

const LoginAnto = ({ setIsLogged, setUser }) => {
  const [accounts, setAccounts] = useState([]);

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('Fill in the fields');

  const [create, setCreate] = useState(false);

  const checkCredential = () => {
    const filteredPeople = accounts.filter(
      (person) =>
        person.username === formValues.username &&
        person.password === formValues.password
    );
    if (
      filteredPeople.length === 1

      // formValues.username === 'anto.anzil' &&
      // formValues.password === 'qwe123'
    ) {
      setUser(filteredPeople[0]);
      setIsLogged(true);
    } else {
      setMessage('Invalid credentials.');
    }
  };

  const openPageAccont = () => {
    setCreate(true);
  };

  const saveInputValues = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <>
      {!create ? (
        <div>
          <h1>Log In </h1>
          {/* <form onSubmit={checkCredential}> */}
          <div>
            <label>
              Username
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={saveInputValues}
                placeholder="Write your name"
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={saveInputValues}
                placeholder="Write your password"
              />
            </label>
          </div>
          <div>
            {/* </form> */}
            <button
              type="button"
              onClick={checkCredential}
              className="btn btn-primary"
            >
              Send
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={openPageAccont}
              className="btn btn-primary"
            >
              Create a new account
            </button>
          </div>

          {/* </form> */}
          <p>{message}</p>
        </div>
      ) : (
        <CreateNewP setCreate={setCreate} setAccounts={setAccounts} />
      )}
    </>
  );
};

export { LoginAnto };
