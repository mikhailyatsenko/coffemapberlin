import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { LocationProvider } from 'app/providers/LocationProvider';
import { ApolloProviderWrapper } from 'app/providers/ApolloProviderWrapper';
import { AuthProvider } from 'app/providers/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <GoogleOAuthProvider clientId="858028409955-br8u88amk22p2gap4rhgjddsmee4hppr.apps.googleusercontent.com">
      <BrowserRouter>
        <LocationProvider>
          <ApolloProviderWrapper>
            <App />
          </ApolloProviderWrapper>
        </LocationProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </AuthProvider>,
);
