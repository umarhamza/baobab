import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT = `border focus:ring-4 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center`;

const COLORS = {
  blue: `text-blue-700 border-blue-700 hover:bg-blue-700 dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800 focus:ring-blue-300 hover:text-white dark:hover:text-white`,
  gray: `text-gray-700 border-gray-700 hover:bg-gray-700 dark:border-gray-500 dark:text-gray-500 dark:focus:ring-gray-800 focus:ring-gray-300 hover:text-white dark:hover:text-white`,
};

const Buttons = ({ children, type, color, className, event }) => {
  className = [className, DEFAULT, COLORS[color]].join(' ');

  switch (type[0]) {
    case 'arrow-icon':
      return (
        <button
          type='button'
          onClick={() => event && event()}
          className={className}
        >
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      );

    default:
      return null;
  }
};

Buttons.defaultProps = {
  color: 'gray',
  children: null,
  event: null,
};

Buttons.propTypes = {
  children: PropTypes.node,
  event: PropTypes.func,
  type: PropTypes.arrayOf(PropTypes.oneOf(['arrow-icon'])),
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Buttons;
