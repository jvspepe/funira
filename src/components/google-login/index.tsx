import type { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { Box, Button, Icon } from '@chakra-ui/react';
import { handleAuthError, loginUserWithGoogle } from '@/lib/auth';
import type { RegisterFormSchema } from '@/pages/register/register-form';
import type { LoginFormSchema } from '@/pages/login/login-form';
import GoogleIcon from '@/assets/GoogleIcon';

type Props = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const GoogleLogin = ({ loading, setLoading }: Props) => {
  const navigate = useNavigate();
  const form = useFormContext<LoginFormSchema | RegisterFormSchema>();

  const handleLoginUserWithGoogle = async () => {
    setLoading(true);
    try {
      await loginUserWithGoogle(form.watch('persistUser'));
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
      gap="0.5rem"
    >
      <Button
        onClick={handleLoginUserWithGoogle}
        type="button"
        variant="outline"
        loading={loading}
        loadingText="Carregando..."
        width="full"
      >
        <Icon>
          <GoogleIcon />
        </Icon>
        <span>Continue com o Google</span>
      </Button>
    </Box>
  );
};

export default GoogleLogin;
