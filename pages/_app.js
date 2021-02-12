import { AppProvider } from 'context/AppContext';
import 'styles/global.css';

const Application = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default Application;
