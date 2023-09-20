import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";

const Image = styled.img`
  flex-grow: 1;
  object-fit: cover;
  transition: transform 200ms;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Link = styled(RouterLink)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover ${Image} {
    transform: scale(1.05);
  }
`;

export { Link, Image, Details };
