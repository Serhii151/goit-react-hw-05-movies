import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { getMovieDetails, getCastDetails, getMovieReviews } from '../api';
import { DetailsContainer, TextContainer, StyledLink } from './MovieDetails.styled';
import { Cast } from '../Cast/Cast';
import { Reviews } from '../Reviews/Reviews';
import styled from 'styled-components';

const MovieWrapper = styled.div`
  padding: 20px;
`;

const MoviePoster = styled.img`
  width: 185px;
  margin: 10px 0;
`;

const AdditionalInfoContainer = styled.div`
  margin-top: 20px;
`;

const AdditionalInfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AdditionalInfoItem = styled.li`
  margin: 10px 0;

  a {
    text-decoration: none;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function MovieDetails() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const fromRef = useRef('/'); 


  useEffect(() => {

    
    if (location.state && location.state.from) {
      fromRef.current = location.state.from;
    }

    async function fetchMovieDetails() {
      const movieData = await getMovieDetails(movieId);
      const castData = await getCastDetails(movieId);
      const reviewsData = await getMovieReviews(movieId);

      setMovie({
        ...movieData,
        cast: castData || [],
        reviews: reviewsData || [],
      });
    }

    fetchMovieDetails();
  }, [movieId, location.state]);

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(fromRef.current);
  };
  

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <MovieWrapper>
      <StyledLink onClick={handleGoBack}>
        Go back
      </StyledLink>
      <DetailsContainer>
        <MoviePoster src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" />
        <TextContainer>
          <h2>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>Use Score: {Math.round(movie.vote_average * 10)} %</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres: {movie.genres.map(genre => genre.name).join(', ')}</h3>
        </TextContainer>
      </DetailsContainer>
      <AdditionalInfoContainer>
        <h3>Additional information</h3>
        <AdditionalInfoList>
          <AdditionalInfoItem>
            <Link to={`/movies/${movieId}/cast`} onClick={() => setCastVisible(!castVisible)}>
              Cast
            </Link>
          </AdditionalInfoItem>
          <AdditionalInfoItem>
            <Link
              to={`/movies/${movieId}/reviews`}
              onClick={() => setReviewsVisible(!reviewsVisible)}
            >
              Reviews
            </Link>
          </AdditionalInfoItem>
        </AdditionalInfoList>
      </AdditionalInfoContainer>
      {castVisible && movie.cast && <Cast cast={movie.cast} />}
      {reviewsVisible && movie.reviews && <Reviews reviews={movie.reviews} />}
    </MovieWrapper>
  );
}

export default MovieDetails;


