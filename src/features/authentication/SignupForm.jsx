import {useForm} from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import styled from 'styled-components';
import {useSignup} from './useSignup';

// Email regex: /\S+@\S+\.\S+/

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function SignupForm() {
  const {
    register,
    formState: {errors},
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const {signup, isSigningUp} = useSignup();

  function onSubmit(data) {
    const {fullName, email, password} = data;
    signup(
      {fullName, email, password},
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register('fullName', {required: 'Full name is required'})}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register('email', {
            required: 'Email is required',
            pattern: {value: /\S+@\S+\.\S+/, message: 'Invalid email address'},
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register('passwordConfirm', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <Box>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </Box>
    </Form>
  );
}

export default SignupForm;
