import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import LocationProvider from 'app/providers/LocationProvider/ui/LocationProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LocationProvider>
      <App />
    </LocationProvider>
  </BrowserRouter>,
);
