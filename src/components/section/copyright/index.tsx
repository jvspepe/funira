import { Flex, Heading, Icon, IconButton, Link } from '@chakra-ui/react';
import { FacebookIcon } from '@/assets/FacebookIcon';
import { InstagramIcon } from '@/assets/InstagramIcon';
import { LinkedInIcon } from '@/assets/LinkedInIcon';

const socialLinks = [
  {
    href: 'https://www.linkedin.com/',
    icon: <LinkedInIcon />,
    label: 'Link Linked In Funira',
  },
  {
    href: 'https://www.facebook.com/',
    icon: <FacebookIcon />,
    label: 'Link Facebook Funira',
  },
  {
    href: 'https://www.instagram.com/',
    icon: <InstagramIcon />,
    label: 'Link Instagram Funira',
  },
];

export function Copyright() {
  return (
    <Flex
      align="center"
      justify="space-between"
    >
      <Heading
        as="h6"
        size={{ base: 'sm', sm: 'md' }}
        fontWeight="normal"
      >
        Copyright 2023 &copy; Avion LTDA.
      </Heading>
      <Flex align="center">
        {socialLinks.map((socialLink) => (
          <IconButton
            key={socialLink.href}
            variant="ghost"
            size="lg"
            asChild
          >
            <Link
              href={socialLink.href}
              target="_blank"
              aria-label={socialLink.label}
              rel="noopener noreferrer"
            >
              <Icon>{socialLink.icon}</Icon>
            </Link>
          </IconButton>
        ))}
      </Flex>
    </Flex>
  );
}
