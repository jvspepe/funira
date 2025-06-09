import { type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { type SignInSchema } from '@/features/users/pages/sign-in/sign-in-validation';
import { type SignUpSchema } from '@/features/users/pages/sign-up/sign-up-validation';
import { signInWithGoogle } from '@/features/users/services/auth';
import { handleAuthError } from '@/features/utils';
import { GoogleIcon } from '@/assets/GoogleIcon';

interface GoogleAuthProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export function GoogleAuth({ loading, setLoading }: GoogleAuthProps) {
  const navigate = useNavigate();

  const form = useFormContext<SignInSchema | SignUpSchema>();

  const { t } = useTranslation();

  const handleLoginUserWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(form.watch('rememberUser'));
      void navigate('/');
    } catch (error) {
      form.setError('root', { message: handleAuthError(error) });
    }
    setLoading(false);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        onClick={handleLoginUserWithGoogle}
        type="button"
        variant="outline"
        loading={loading}
        loadingText="Carregando..."
        width="full"
        gap="{spacing.3}"
      >
        <Icon>
          <GoogleIcon />
        </Icon>
        <Text textStyle="sm">{t('common:buttons.google-auth')}</Text>
      </Button>
    </Box>
  );
}
