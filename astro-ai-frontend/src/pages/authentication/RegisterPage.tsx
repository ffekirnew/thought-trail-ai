import astronaut_running from '../../assets/astronaut_running.mp4';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
import Authentication from '../../components/authentication/Authentication';
import InputField from '../../components/authentication/InputForm';
import { Text, Heading, Button, VStack } from '@chakra-ui/react';

const schema = z
.object({
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
  const history = useNavigate();

  const onRegister = (data: FieldValues) => {
    console.log(data);
  }

  return <VStack gap={10} align={'left'} padding={10} width={'100%'}>
      <Heading>Create an account with Us</Heading>
      <form onSubmit={handleSubmit(onRegister)}>
        <VStack align={'left'} gap={2}>
        <InputField
          label="Username"
          name="username"
          register={register}
          type="text"
          disabled={false}
          placeholder="e.g. starlord"
          error={errors.username && errors.username.message}
        />
        <InputField
          label="Email"
          name="email"
          register={register}
          type="email"
          disabled={false}
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
          disabled={false}
        />
        <InputField
          label="Confirm Password"
          name="passwordConfirmation"
          register={register}
          type="password"
          placeholder="Confirm your password"
          error={errors.passwordConfirmation && errors.passwordConfirmation.message}
          disabled={false}
        />
        <Button type={'submit'} colorScheme='blue' disabled={false} borderRadius={'full'} size={'lg'}>
          <Text fontWeight={'bold'}>
           Register 
          </Text>
        </Button>
        </VStack>
      </form>
      <Text fontSize={'md'}>
        Already have an account? <Button colorScheme='blue' variant={'link'} onClick={() => history('/auth/sign-in')}>Sign In!</Button>
      </Text>
    </VStack>
};

export default RegisterPage;
