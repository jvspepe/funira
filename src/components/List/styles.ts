import { styled } from "styled-components";
import font from "../../styles/font";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  list-style: none;
`;

const Heading = styled.h6`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
  font-weight: normal;
`;

const ListItem = styled.li`
  font-family: ${font.family.body};
  font-size: ${font.size.sm};
`;

export { List, Heading, ListItem };
