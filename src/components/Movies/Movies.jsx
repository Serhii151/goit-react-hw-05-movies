import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchMovies } from '../api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MoviesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;
  }
`;

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    const results = await searchMovies(searchQuery);
    setSearchResults(results);

    const queryParams = new URLSearchParams(location.search);
    queryParams.set('q', searchQuery);
    navigate(`/movies?${queryParams.toString()}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');

    if (query) {
      setSearchQuery(query);
      searchMovies(query).then((results) => setSearchResults(results));
    }
  }, [location.search]);

  
  return (
    <Container>
      <Title>Search Movies</Title>
      <InputContainer>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
        </form>
      </InputContainer>

      <MoviesList>
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location.pathname + location.search }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </MoviesList>
    </Container>
  );
};

export default Movies;