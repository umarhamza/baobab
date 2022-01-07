import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useContextState from '../context/UseStateContext';
import getData from '../utils/getData';

const classes = {
  label:
    'text-xl font-bold tracking-tight mb-2 block text-gray-900 dark:text-gray-300',
  inputLarge:
    'block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500',
};

const Add = () => {
  const [state, setState] = useContextState({
    english: '',
    wolof: '',
    arabic: '',
  });
  const [formData, setFormData] = useState();
  const [localData, setLocalData] = useState();

  const { english, wolof, arabic } = state;

  useEffect(() => {
    getData().then(() => {
      setLocalData(JSON.parse(localStorage.getItem('baobabData')));
    });
  }, [setState]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      languages: [...localData, [english, wolof, arabic]],
    }));
  };

  const handleChange = ({ target: { value, id } }) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Layout>
      <form className='mt-10' onSubmit={(event) => handleSubmit(event)}>
        <h4 className='mb-6 text-3xl font-bold'>Add +</h4>
        <div className='mb-6'>
          <label htmlFor='english' className={classes.label}>
            English
          </label>
          <input
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
          Register new account
        </button>
      </form>
    </Layout>
  );
};

export default Add;
