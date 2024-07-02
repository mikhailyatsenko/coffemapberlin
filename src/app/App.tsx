import { Footer } from 'widgets/Footer';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main>
        <AppRouter />
      </main>

      {location.pathname !== '/' && <Footer />}
    </>
  );
};

export default App;
