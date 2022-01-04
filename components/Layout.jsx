import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import SEO from './SEO';

const Layout = ({ children, seoTitle, pageTitle, showBackButton }) => {
  return (
    <div className={`h-screen overflow-y-auto overflow-x-hidden`}>
      <SEO pageName={seoTitle} />
      <main
        className={`min-h-full flex-1 flex flex-col justify-center items-center`}
      >
        <div
          style={{ height: '592px' }}
          className='p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'
        >
          <Title title={pageTitle} showBack={showBackButton} />
          {children}
        </div>
      </main>
    </div>
  );
};

Layout.defaultProps = {
  seoTitle: 'Translations',
  pageTitle: 'Baobab',
  showBackButton: true,
};

Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  showBackButton: PropTypes.bool,
};

export default Layout;
