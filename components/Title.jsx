import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Title = ({ title, showBack }) => {
  return (
    <div className='flex justify-between items-center mb-4'>
      <h3 className='text-4xl font-bold leading-none text-gray-900 dark:text-white'>
        {title}
      </h3>
      {showBack ? (
        <Link href='/' passHref>
          <span className='text-sm font-medium text-gray-900 hover:underline dark:text-gray-100'>
            Back
          </span>
        </Link>
      ) : (
        <Link href='/add' passHref>
          <span className='text-sm font-medium text-gray-900 hover:underline dark:text-gray-100'>
            + Add
          </span>
        </Link>
      )}
    </div>
  );
};

Title.defaultProps = {
  showBack: true,
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
};

export default Title;
