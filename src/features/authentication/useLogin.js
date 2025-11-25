import {useMutation, useQueryClient} from '@tanstack/react-query';
import {login as apiLogin} from '../../services/apiAuth';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: login, isPending: isLoggingIn} = useMutation({
    mutationFn: async ({email, password}) => apiLogin({email, password}),
    onSuccess: ({user}) => {
      queryClient.setQueryData({queryKey: ['currentUser'], data: user});
      toast.success('Login successful!');
      navigate('/dashboard', {replace: true});
    },
    onError: (error) => {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error.message);
    },
  });

  return {login, isLoggingIn};
}
