import Meta from './Meta.js';
import Header from './Header.js';
import Footer from './Footer.js';

const Layout = ({ children }) => {
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
