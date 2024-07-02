import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { LocationProvider } from 'app/providers/LocationProvider';
import { ApolloProviderWrapper } from 'app/providers/ApolloProviderWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LocationProvider>
      <ApolloProviderWrapper>
        <App />
      </ApolloProviderWrapper>
    </LocationProvider>
  </BrowserRouter>,
);
