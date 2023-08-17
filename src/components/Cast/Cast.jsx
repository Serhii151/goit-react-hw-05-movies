import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMAGE_BASE_URL, DEFAULT_IMAGE } from '../constants/imageConstants';

const CastWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;

  img {
    width: 100px;
    height: 150px;
    object-fit: cover;
    margin-right: 10px;
  }

  p {
    margin: 0;
  }

  span {
    font-weight: bold;
  }
`;

export const Cast = ({ cast }) => {
  return (
    <div>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <CastWrapper>
              <img
                src={`${
                  actor.profile_path
                    ? IMAGE_BASE_URL + actor.profile_path
                    : DEFAULT_IMAGE + '?text=' + actor.name
                }`}
                alt={actor.name}
              />
              <div>
                <p>
                  <span>Actor:</span> {actor.name}
                </p>
                <p>
                  <span>Character:</span> {actor.character}
                </p>
              </div>
            </CastWrapper>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    })
  ).isRequired,
};

export default Cast;
