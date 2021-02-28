import { useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import Meta from 'components/Meta';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Layout = ({ children }) => {
  /**
   * Allows user to overwride the default system theme with
   * value stored in state.
   */
  const { app } = useAppContext();
  useEffect(() => {
    const body = document.querySelector('body').classList;
    const classes = ['system', 'light', 'dark'];

    /** First remove all classes from the body, then add value set in state */
    body.remove(...classes);
    body.add(app.theme);
  }, [app.theme]);

  return (
    <>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
