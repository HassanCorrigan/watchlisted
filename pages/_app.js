import { AppWrapper } from 'context/AppContext';
import 'styles/global.css';

const Application = ({ Component, pageProps }) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
};

export default Application;
