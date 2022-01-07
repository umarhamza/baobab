import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useContextState from '../context/UseStateContext';
import getData from '../utils/getData';
import axios from 'axios';

const classes = {
  label:
    'text-xl font-bold tracking-tight mb-2 block text-gray-900 dark:text-gray-300',
  inputLarge: `block p-4 w-full text-gray-900 rounded-lg border sm:text-lg focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-50 dark:border-gray-300 dark:text-gray-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500`,
};

const Add = () => {
  const initialFormData = {
    english: '',
    wolof: '',
    arabic: '',
  };

  const [state, setState] = useContextState();
  const [localData, setLocalData] = useState();
  const [formData, setFormData] = useState(initialFormData);

  const { english, wolof, arabic } = formData;

  useEffect(() => {
    getData().then((languageArray) => {
      if (languageArray) {
        setLocalData(JSON.parse(localStorage.getItem('baobabData')));
        setState((prevState) => ({
          ...prevState,
          alert: null,
          loading: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          alert: {
            msg: 'There was an error loading translations.',
            type: 'error',
          },
        }));
      }
    });
  }, [setState]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newLanguages = [...localData, [english, wolof, arabic]];

    localStorage.setItem('baobabData', JSON.stringify(newLanguages));

    axios.post('/api/postGoogleAPI', newLanguages).then(() => {
      setFormData(initialFormData);
      setState((prevState) => ({
        ...prevState,
        languages: newLanguages,
        alert: {
          msg: 'New translation saved.',
          type: 'success',
        },
      }));

      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          alert: null,
        }));
      }, 5000);
    });
  };

  const handleChange = ({ target: { value, id } }) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Layout>
      <form className='mt-10' onSubmit={(event) => handleSubmit(event)}>
        <h4 className='mb-6 text-3xl font-bold dark:text-gray-50'>
          Add Translations
        </h4>
        <div className='mb-6'>
          <label htmlFor='english' className={classes.label}>
            English
          </label>
          <input
            value={english}
            onChange={(event) => handleChange(event)}
            type='text'
            id='english'
            className={classes.inputLarge}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='wolof' className={classes.label}>
            Wolof
          </label>
          <input
            value={wolof}
            onChange={(event) => handleChange(event)}
            type='text'
            id='wolof'
            className={classes.inputLarge}
          />
        </div>
        <div>
          <label htmlFor='arabic' className={classes.label}>
            Arabic
          </label>
          <input
            value={arabic}
            onChange={(event) => handleChange(event)}
            type='text'
            id='arabic'
            className={classes.inputLarge}
          />
        </div>
        <button
          type='submit'
          className='mt-10 text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
        >
          Add +
        </button>
      </form>
    </Layout>
  );
};

export default Add;
