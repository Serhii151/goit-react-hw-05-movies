import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: black;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
`;


export const TextContainer = styled.div`
  margin-left: 20px;
`;

export default StyledLink;