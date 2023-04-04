import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CreateNewP = ({ setCreate, setAccounts }) => {
  // const validatePassword = (password) => {
  //   if (password.length> 8) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  const [message, setMessage] = useState({ username: '', password: '' });
  const [disableCreateNewPerson, setDisableCreateNewPerson] = useState(true);
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formStates, setFormStates] = useState({usernameValidation:false, passwordValidation:false});

  useEffect(() => {
    // HABILITAR / DESHABILITAR BTN
    if(formStates.usernameValidation === true && formStates.passwordValidation === true) {
      setDisableCreateNewPerson(false);
    } else {
      setDisableCreateNewPerson(true);
    }
  }, [formValues]);

  const handleOnChange = (event) => {
    // esta ente llaves el event... porque ES UNA VARIABLE
    setFormValues({ ...formValues, [event.target.name]: event.target.value });

    // Validate event field
    if(event.target.name === 'username') {
      validateUsername(event.target.value);
    }
    if(event.target.name === 'password') {
      validatePassword(event.target.value);
    }
  };

  const validateUsername = (username) => {
    if (username.length === 0) {
      setMessage({ ...message, username: 'The username musnt be empty' });
      setFormStates({...formStates, usernameValidation:false});
    } else {
      setMessage({ ...message, username: '' });
      setFormStates({...formStates, usernameValidation:true});
    }
  };

  const validatePassword = (password) => {
    if (password.length > 7) {
      setMessage({ ...message, password: '' });
      setFormStates({...formStates, passwordValidation:true});
    } else {
      setMessage({
        ...message,
        password: 'Your password must have more than 7 characters',
      });
      setFormStates({...formStates, passwordValidation:false});
    }
  };

  const createNewPerson = (event) => {
    event.preventDefault();
    Swal.fire({title:`Hello: ${formValues.username}`, icon: 'success'});  
    setCreate(false);
    const person = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    setAccounts((oldArray) => [...oldArray, person]);
  };

  const backToLogin = () => {
    setCreate(true);
  };

  return (
    <>
      <div>
        <h1>Create a new Account</h1>
      <div> 
      <form onSubmit={createNewPerson}>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              placeholder="Write here your username."
              name="username"
              value={formValues.username}
              onChange={handleOnChange}
            ></input>
            {message.username}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              placeholder="Write here your password."
              name="password"
              value={formValues.password}
              onChange={handleOnChange}
            ></input>
            {message.password}
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={disableCreateNewPerson}
          >
            Create
          </button>
            </div>
            <div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={backToLogin}
          >
            Back
          </button>
          </div>
      </form>
      </div>
      </div>
    </>
  );
};
export { CreateNewP };
