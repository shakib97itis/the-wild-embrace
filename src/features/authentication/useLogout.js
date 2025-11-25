import {useMutation} from '@tanstack/react-query';
import {logout as apiLogout} from '../../services/apiAuth';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router';
import {useQueryClient} from '@tanstack/react-query';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: logout, isPending: isLoggingOut} = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('Logout successful!');
      navigate('/login', {replace: true});
    },
    onError: (error) => {
      toast.error('Logout failed. Please try again.');
      console.error('Logout error:', error.message);
    },
  });

  return {logout, isLoggingOut};
}
