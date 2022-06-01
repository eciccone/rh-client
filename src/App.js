import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import NavBar from './components/nav/NavBar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import CreateRecipePage from './pages/CreateRecipePage';

function App() {

  const { isLoading } = useAuth0();

  return (
    <div className="App">
      <NavBar />

      {isLoading ? <h1>Loading...</h1> : (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/new" element={<CreateRecipePage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
