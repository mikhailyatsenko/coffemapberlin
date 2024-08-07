import { useLocation } from 'react-router-dom';
import { Footer } from 'widgets/Footer';
import { Navbar } from 'widgets/Navbar';
import { AppRouter } from './providers/router';

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
