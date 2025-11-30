import {useQuery} from '@tanstack/react-query';
import {getCurrentUser} from '../../services/apiAuth';

export const useUser = () => {
  const {data: user, isPending: isUserLoading} = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';
  return {user, isUserLoading, isAuthenticated};
};
