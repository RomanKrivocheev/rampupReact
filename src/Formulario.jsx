import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = () => {
  const [people, setPeople] = useState([]); // Hook inici con 1 obj
  const [tempPeople, setTempPeople] = useState([]);
  const [shouldSaveTempPeople, setShouldSaveTempPeople] = useState([false]);
  
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    age: '',
    dni: '',
  });

  const [dniSearchValue, setDniSearchValue] = useState();
  const [disableSendButton, setDisableSendButton] = useState(false);

 

  useEffect(() => {
    toast('Logged in');
  }, []);

  useEffect(() => {
    if (shouldSaveTempPeople) {
      setTempPeople(people);
      setShouldSaveTempPeople(false);
    }
  }, [people]);

  const updatePerson = () => {
    let tempArray = [...people];
    const index = tempArray.findIndex(
      (element) => element.dni === formValues.dni
    );
    tempArray[index] = {
      name: formValues.name,
      lastName: formValues.lastName,
      age: formValues.age,
      dni: formValues.dni,
    };
    setPeople(tempArray);
    return true;
  };

  // Change method name (update && add)
  const addPerson = (event) => {
    event.preventDefault();
    let update = false;

    // UPDATE PERSON
    people.forEach((person) => {
      // Update people array if dni exists
      if (person.dni === formValues.dni) {
        update = updatePerson();
      }
    });

    // ADD PERSON
    if (!update) {
      // Create a new person object to add to people array
      const person = {
        name: formValues.name,
        lastName: formValues.lastName,
        age: formValues.age,
        dni: formValues.dni,
      };

      // Add new person to people list to show
      setPeople((oldArray) => [...oldArray, person]);
    }
    // We set all the form values to empty
    setFormValues({ name: '', lastName: '', age: '', dni: '' });
    setShouldSaveTempPeople(true);
  };

  const deletePerson = (event) => {
    event.preventDefault();
    const peopleWithoutInputDNI = people.filter(
      (person) => person.dni !== event.target[0].value
    );
    setShouldSaveTempPeople(true);
    setPeople(peopleWithoutInputDNI);
  };

  const inputValueChanged = (event) => {
    // SI LE PASO CLAVE QUE EXISTE => SOOBREESCRIBE Y NO CREA NUEVO
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const searchPerson = (event) => {
    // event.preventDefault();
    // setTempPeople(people);
    // let tempPeopleArray = [...people];
    // const peopleWithInputDNI = tempPeopleArray.filter(
    //   (person) => person.dni === dniSearchValue
    // );
    // setPeople(peopleWithInputDNI);
  };

  const changeDniSearchValue = (event) => {
    setDniSearchValue(event.target.value);

    if (event.target.value.length !== 0) {
      setDisableSendButton(true);

      // Search logic
      const filteredPeople = tempPeople.filter(
        (person) => person.dni === event.target.value
      );
      setPeople(filteredPeople);
    } else {
      setDisableSendButton(false);
      setPeople(tempPeople);
    }

    // Logic of search
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div>
        <h1>New person</h1>
        <form onSubmit={addPerson}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={inputValueChanged}
            />
          </label>
          <label>
            LastName:
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={inputValueChanged}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formValues.age}
              onChange={inputValueChanged}
            />
          </label>
          <label>
            DNI:
            <input
              type="number"
              name="dni"
              value={formValues.dni}
              onChange={inputValueChanged}
            />
          </label>
          <button disabled={disableSendButton} type="submit">
            Send
          </button>
        </form>
      </div>
      <div>
        <h2>People list</h2>

        {people.map((person) => {
          return (
            <ol key={person.dni}>
              <li>{person.name}</li>
              <li>{person.lastName}</li>
              <li>{person.age}</li>
              <li>{person.dni}</li>
            </ol>
          );
        })}
      </div>
      <div>
        <h3>Delete person by DNI</h3>
        <form onSubmit={deletePerson}>
          <label>
            DNI:
            <input type="number" name="dni" />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>

      <div>
        <h3>Search person by DNI</h3>

        <label>
          DNI:
          <input
            type="number"
            name="dni"
            value={dniSearchValue || ''}
            onChange={changeDniSearchValue}
          />
        </label>
        {/* <button type="button" onClick={searchPerson}>
          Search
        </button>
        <button type="button" onClick={resetPeople}>
          Reset
        </button> */}
      </div>
    </>
  );
};

export { Formulario };
