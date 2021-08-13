import './styles/styles.scss';
import './app.scss';

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Header from 'Shell/components/header/Header';
import Footer from 'Shell/components/footer/Footer';
import AppRouter from 'Shell/components/AppRouter';
import PageNavbar from 'Shell/components/navbar/Navbar';

const propTypes = {
  initialState: PropTypes.object,
  hasServerMarkup: PropTypes.bool
};

const defaultProps = {
  initialState: {},
  hasServerMarkup: false
};

const App = ({initialState, hasServerMarkup}) => {
  const [isStartup, setIsStartup] = useState(hasServerMarkup);

  useEffect(() => {
    setIsStartup(false);
  }, [setIsStartup]);

  return (
    <>
      <header className="page-header">
        <Header />
      </header>
      <nav>
        <PageNavbar />
      </nav>
      <main>
        <AppRouter isStartup={isStartup} initialState={initialState} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
