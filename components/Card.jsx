import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card, prefix }) => {
  return (
    <div className='mb-6 p-4 max-w-sm rounded-lg border shadow-md bg-gray-800 border-gray-700'>
      <h5 className='text-xl font-bold tracking-tight text-white'>
        {prefix && <span className='capitalize'>{`${prefix}: `}</span>}
        {card}
      </h5>
    </div>
  );
};

Card.defaultProps = {
  prefix: null,
};

Card.propTypes = {
  card: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

export default Card;
