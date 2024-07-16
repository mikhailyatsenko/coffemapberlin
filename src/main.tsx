import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { LocationProvider } from 'app/providers/LocationProvider';
import { ApolloProviderWrapper } from 'app/providers/ApolloProviderWrapper';
import { AuthProvider } from 'app/providers/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error(`Missing required environment variable: GOOGLE_CLIENT_ID`);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProviderWrapper>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <LocationProvider>
            <App />
          </LocationProvider>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </ApolloProviderWrapper>,
);
