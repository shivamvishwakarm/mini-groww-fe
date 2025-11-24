import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from '@/routes/AppRoutes';
import './App.css';

function AppContent() {
  const elements = useRoutes(routes);
  return elements;
}

function App() {
  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;
