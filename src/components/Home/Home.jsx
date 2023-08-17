import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from '../api';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 20px;
`;

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MovieListItem = styled.li`
  margin-bottom: 10px;
`;

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }

    fetchTrendingMovies();
  }, []);

  return (
    <HomeContainer>
      <h1>Trending Movies</h1>
      <MovieList>
        {trendingMovies.map(movie => (
          <MovieListItem key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </MovieListItem>
        ))}
      </MovieList>
    </HomeContainer>
  );
}

export default Home;