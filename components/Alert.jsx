import React from 'react';
import PropTypes from 'prop-types';

const classes = {
  error:
    'p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',
  success:
    'p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800',
  default:
    'p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800',
};

const exclaimation = {
  success: 'Success!',
  error: 'Error!',
};

const Alert = ({ msg, type }) => {
  const exclaim = exclaimation[type];

  return (
    <div className={classes[type]} role='alert'>
      {exclaim && <span className='font-medium'>{`${exclaim} `}</span>} {msg}
    </div>
  );
};

Alert.defaultProps = {
  type: 'default',
};

Alert.propTypes = {
  alert: PropTypes.string,
  msg: PropTypes.string.isRequired,
};

export default Alert;
