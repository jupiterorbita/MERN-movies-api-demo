import './App.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';
import Results from './components/Results';

function App() {

  return (
    <>
      <h1>Movies</h1>
      <Link to="/movies">Movies home</Link>
      <MovieForm />

      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:movieId/:currentPage" element={<MovieDetails />} />
        <Route path="/movies/results/:searchWord" element={<Results />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
