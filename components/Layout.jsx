import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import SEO from './SEO';
import Alert from './Alert';
import useContextState from '../context/UseStateContext';

const Layout = ({ children, seoTitle, pageTitle, showBackButton }) => {
  const [state, setState] = useContextState();
  const alertType = state.alert ? state.alert.type : null;
  const alertMsg = state.alert ? state.alert.msg : null;

  return (
    <div
      className={`h-screen overflow-y-auto overflow-x-hidden dark:bg-gray-800`}
    >
      <SEO pageName={seoTitle} />
      <main
        className={`min-h-full flex-1 flex flex-col justify-center items-center`}
      >
        <div
          style={{ height: '100vh' }}
          className='p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'
        >
          <Title title={pageTitle} showBack={showBackButton} />
          {alertMsg && <Alert type={alertType} msg={alertMsg} />}
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
