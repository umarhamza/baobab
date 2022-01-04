import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ className, ...rest }) => {
  return (
    <div className={`relative mt-3 ${className}`}>
      <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <input
        {...rest}
        type='text'
        id='search-field'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Search english translation'
      />
    </div>
  );
};

Search.defaultProps = {
  className: '',
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
