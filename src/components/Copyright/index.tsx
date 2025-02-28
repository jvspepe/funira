import { Box, Heading, Icon, IconButton, Link } from '@chakra-ui/react';
import FacebookIcon from '@/assets/FacebookIcon';
import LinkedInIcon from '@/assets/LinkedInIcon';
import InstagramIcon from '@/assets/InstagramIcon';

const Copyright = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading
        as="h6"
        color="white"
        fontSize={{ base: '0.875rem', sm: '1rem' }}
      >
        Copyright 2023 &copy; Avion LTDA.
      </Heading>
      <Box
        display={{ base: 'flex' }}
        alignItems="center"
        color="white"
      >
        <IconButton
          as={Link}
          href="https://www.linkedin.com/"
          target="_blank"
          aria-label="Link para página do Linked In de Funira"
          variant="ghost"
          icon={
            <Icon
              as={LinkedInIcon}
              height="1.5rem"
              width="1.5rem"
            />
          }
        />
        <IconButton
          as={Link}
          href="https://www.linkedin.com/"
          target="_blank"
          aria-label="Link para página do Facebook In de Funira"
          variant="ghost"
          icon={
            <Icon
              as={FacebookIcon}
              height="1.5rem"
              width="1.5rem"
            />
          }
        />
        <IconButton
          as={Link}
          href="https://www.linkedin.com/"
          target="_blank"
          aria-label="Link para página do Instagram In de Funira"
          variant="ghost"
          icon={
            <Icon
              as={InstagramIcon}
              height="1.5rem"
              width="1.5rem"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Copyright;
