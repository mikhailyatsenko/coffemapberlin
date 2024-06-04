import AppRouter from './providers/router/ui/AppRouter';
import { Navbar } from 'widgets/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <AppRouter />
      </main>
    </>
  );
};

export default App;
