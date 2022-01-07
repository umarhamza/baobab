import React from 'react';
import PropTypes from 'prop-types';
import Buttons from './Buttons';
import Link from 'next/link';
import getPageIndex from '../utils/getPageIndex';
import { v4 as uuid } from 'uuid';

const List = ({ list, originalList }) => {
  return (
    <div className='flow-root overflow-hidden -mx-8'>
      <ul
        role='list'
        className={`divide-y divide-gray-200 dark:divide-gray-700
        h-96 mb-6 -mr-4 overflow-y-scroll overflow-x-hidden`}
      >
        {list &&
          list.map((item, index) => {
            const linkIdx = getPageIndex(item, originalList);
            return (
              <li
                key={uuid()}
                className='py-3 sm:py-4 cursor-pointer hover:bg-gray-100 px-8'
              >
                <Link
                  href={`/${typeof linkIdx !== 'undefined' ? linkIdx + 1 : ''}`}
                  passHref
                >
                  <div className='flex items-center space-x-4'>
                    <div className='flex-1 min-w-0'>
                      <p className='text-2xl font-medium text-gray-900 truncate dark:text-white'>
                        {item.wolof || (
                          <span className=''>Wolof not added!</span>
                        )}
                      </p>
                      <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                        {item.english || (
                          <span className='italic'>English not added!</span>
                        )}
                      </p>
                    </div>
                    <div className='inline-flex items-center text-base'>
                      <Buttons type={['arrow-icon']} />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      english: PropTypes.string,
      wolof: PropTypes.string,
      arabic: PropTypes.string,
    })
  ).isRequired,
  originalList: PropTypes.arrayOf(PropTypes.shape({})),
};

export default List;
