import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { BsEyeFill, BsEyeSlash, BsEyeSlashFill } from 'react-icons/bs';

interface Props {
  label: string;
  name: string;
  register: CallableFunction;
  type: "text" | "password" | "email";
  placeholder?: string;
  helperText?: string;
  disabled: boolean;
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}
const InputField = ({ label, name, register, type, placeholder, disabled, error, helperText }: Props) => {
  const [ showPassword, setShowPassword ] = useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl isInvalid={error !== undefined} gap={5}>
      <FormLabel htmlFor={name}>
        {label}
      </FormLabel>
      <InputGroup size={'lg'} variant={'outline'} justifyContent={'center'}>
        <Input
          variant={'filled'}
          size={'lg'}
          borderRadius={15}
          {...register(name)}
          type={showPassword ? 'text' : type}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
        />
        { type === "password" && <InputRightElement width={'3rem'} marginX={'0.5rem'}>
          <Button onClick={toggleShowPassword} variant={'ghost'}>
            { !showPassword ? <BsEyeFill size={'20px'} /> : <BsEyeSlashFill /> }
          </Button>
        </InputRightElement> }
      </InputGroup>
      {!error ? (
        <FormHelperText>
          { helperText }
        </FormHelperText>
      ) : (
        <FormErrorMessage>{ error.toString() }</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputField;
