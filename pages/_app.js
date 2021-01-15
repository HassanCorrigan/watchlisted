import { AppWrapper } from 'context/state.js';
import 'styles/global.css';

const Application = ({ Component, pageProps }) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
};

export default Application;
