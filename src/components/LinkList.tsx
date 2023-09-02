import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";
import font from "../styles/font";

type Props = {
  title: string;
  links: string[];
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: white;
  list-style: none;
`;

const ListTitle = styled.h6`
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
  font-weight: normal;
`;

const ListItem = styled.li`
  font-family: ${font.family.body};
  font-size: ${font.size.sm};
`;

const Link = styled(RouterLink)`
  color: inherit;
  text-decoration: none;
`;

const LinkList = ({ title, links }: Props) => {
  return (
    <List>
      <ListTitle>{title}</ListTitle>
      {links.map((link) => (
        <ListItem key={link}>
          <Link to="/">{link}</Link>
        </ListItem>
      ))}
    </List>
  );
};

export default LinkList;
