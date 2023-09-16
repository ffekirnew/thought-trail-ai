import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import InputField from '../../components/authentication/InputForm';
import { Text, Heading, Button, VStack } from '@chakra-ui/react';
import LoadingRipples from '../../components/ui/loading-ripples/LoadingRipples';
import { useRegister } from '../../hooks/auth';

const schema = z
.object({
  name: z
  .string()
  .min(3, { message: "Name must be at least 3 characters." })
  .regex(/^[a-zA-Z]+$/, { message: "Name can only contain letters, numbers, and underscores."}),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email must be a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, {
      message:
        "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character (@#$%^&+=!).",
    }),
  passwordConfirmation: z
    .string()
    .min(8, { message: "Password confirmation must be at least 8 characters." })
})
.refine((data) => data.password === data.passwordConfirmation, {
  path: ["passwordConfirmation"],
  message: "Password don't match",
});

type RegisterSchema = z.infer<typeof schema>;

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({ resolver: zodResolver(schema) }); 
  const navigate = useNavigate();
  const {register: signUp, isSuccess, isLoading, error} = useRegister();

  const onRegister = (data: FieldValues) => {
    signUp(data.name, data.email, data.username, data.password);
  }

  if (isSuccess) {
    navigate('/everything');
  }

  return <VStack gap={10} align={'left'} padding={10} width={'100%'}>
      <Heading>Create an account with Us</Heading>
      <form onSubmit={handleSubmit(onRegister)}>
        <VStack align={'left'} gap={2}>
        <InputField
          label="Name"
          name="name"
          register={register}
          type="text"
          disabled={isLoading}
          placeholder="e.g. Peter"
          error={errors.username && errors.username.message}
        />
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
          label="Email"
          name="email"
          register={register}
          type="email"
          disabled={isLoading}
          placeholder="e.g. starlord@guardians.galaxy"
          helperText='We advise you use your primary email.'
          error={errors.email && errors.email.message}
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
        <InputField
          label="Confirm Password"
          name="passwordConfirmation"
          register={register}
          type="password"
          placeholder="Confirm your password"
          error={errors.passwordConfirmation && errors.passwordConfirmation.message}
          disabled={isLoading}
        />
        <Text fontSize={'md'} color={'red.400'}>{error}</Text>
        <Button type={'submit'} background='brand.primary' disabled={isLoading} borderRadius={'full'} size={'lg'}>
          { isLoading ?
            <LoadingRipples color={'gray.200'} size={'sm'} /> :
            <Text fontWeight={'bold'}>Register</Text>
          }
        </Button>
        </VStack>
      </form>
      <Text fontSize={'md'}>
        Already have an account? <Button color='brand.secondary' variant={'link'} onClick={() => navigate('/auth/sign-in')}>Sign In!</Button>
      </Text>
    </VStack>
};

export default RegisterPage;
