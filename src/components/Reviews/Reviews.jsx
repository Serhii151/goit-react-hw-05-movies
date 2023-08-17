import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ReviewsWrapper = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;

  p {
    margin: 0;
  }

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const NoReviewsMessage = styled.p`
  font-style: italic;
  text-align: center;
`;

export const Reviews = ({ reviews }) => {
  return (
    <ReviewsWrapper>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewItem>
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </ReviewItem>
            </li>
          ))}
        </ul>
      ) : (
        <NoReviewsMessage>We don't have any reviews for this movie.</NoReviewsMessage>
      )}
    </ReviewsWrapper>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default Reviews;