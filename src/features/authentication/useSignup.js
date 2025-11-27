import {useMutation} from '@tanstack/react-query';
import {signup as signupApi} from '../../services/apiAuth';
import toast from 'react-hot-toast';
export function useSignup() {
  const {mutate: signup, isPending: isSigningUp} = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success('Signup successful! Please verify your email.');
    },
    onError: (error) => {
      toast.error('Signup failed. Please try again.');
      console.error('Signup error:', error.message);
    },
  });

  return {signup, isSigningUp};
}
