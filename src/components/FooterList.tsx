import { Link } from "react-router-dom";
import { styled } from "styled-components";

type Props = { routes: string[] };

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionTitle = styled.h4`
  color: white;
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: ${({ theme }) => theme.typography.heading.sm};
  font-weight: normal;
`;

const SectionLink = styled(Link)`
  color: white;
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: ${({ theme }) => theme.typography.body.sm};

  text-decoration: none;
`;

const FooterList = ({ routes }: Props) => {
  return (
    <Section>
      <SectionTitle>Nossa Empresa</SectionTitle>
      {routes.map((route) => (
        <SectionLink key={route} to="/">
          {route}
        </SectionLink>
      ))}
    </Section>
  );
};

export default FooterList;
