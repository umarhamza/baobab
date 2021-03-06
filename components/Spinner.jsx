import React from 'react';

export const Spinner = () => {
  return (
    <div className='h-full w-full absolute top-0 left-0 flex justify-center items-center'>
      <div
        className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};
