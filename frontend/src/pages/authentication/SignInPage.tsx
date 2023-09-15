import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import InputField from '../../components/authentication/InputForm';
import { Text, Heading, Button, VStack } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';
import LoadingRipples from '../../components/ui/loading-ripples/LoadingRipples';

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 charachters." }),
  password: z.string().min(6, { message: "Password must be at least 6 charachters." })
});

type SignInFormSchema = z.infer<typeof schema>

const SignInPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<SignInFormSchema>({ resolver: zodResolver(schema) });
  const { login, isLoading, error, isSuccess } = useLogin();
  const navigate = useNavigate();

  const onSignIn = (data: FieldValues) => {
    login(data.username, data.password);
  }

  if (isSuccess) navigate('/everything');

  return <VStack gap={10} align={'left'} padding={10} width={'100%'}>
      <Heading>Sign in to ThoughtTrail</Heading>
      <form onSubmit={handleSubmit(onSignIn)}>
        <VStack align={'left'} gap={2}>
        <InputField
          label="Username"
          name="username"
          register={register}
          type="text"
          disabled={isLoading}
          placeholder="e.g. starlord"
          error={errors.username && errors.username.message}
        />
        <InputField
          label="Password"
          name="password"
          register={register}
          type="password"
          placeholder="Enter your password"
          error={errors.password && errors.password.message}
          disabled={isLoading}
        />
        <Text fontSize={'md'} color='red.400'>{error}</Text>
        <Button type={'submit'} background={'brand.primary'} disabled={isLoading} borderRadius={'full'} size={'lg'}>
          { isLoading ?
            <LoadingRipples color={'gray.200'} size={'sm'} /> :
            <Text fontWeight={'bold'}>Sign In</Text>
          }
        </Button>
        </VStack>
      </form>
      <Text fontSize={'md'}>
        Don't have an account? <Button color='brand.secondary' variant={'link'} onClick={() => navigate('/auth/register')}>Register!</Button>
      </Text>
    </VStack>
};

export default SignInPage;
