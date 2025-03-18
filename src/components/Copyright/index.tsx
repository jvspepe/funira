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
          asChild
          variant="ghost"
        >
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            aria-label="Link para página do Linked In de Funira"
          >
            <Icon
              as={LinkedInIcon}
              height="1.5rem"
              width="1.5rem"
            />
          </Link>
        </IconButton>
        <IconButton
          asChild
          variant="ghost"
        >
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            aria-label="Link para página do Facebook In de Funira"
          >
            <Icon
              as={FacebookIcon}
              height="1.5rem"
              width="1.5rem"
            />
          </Link>
        </IconButton>
        <IconButton
          asChild
          variant="ghost"
        >
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            aria-label="Link para página do Instagram In de Funira"
          >
            <Icon
              as={InstagramIcon}
              height="1.5rem"
              width="1.5rem"
            />
          </Link>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Copyright;
