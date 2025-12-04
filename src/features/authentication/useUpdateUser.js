import toast from 'react-hot-toast';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateUser as updateUserApi} from '../../services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const {mutate: updateUser, isPending: isUpdating} = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success('User updated successfully!');
      queryClient.invalidateQueries({queryKey: ['currentUser']});
    },
    onError: (err) => {
      toast.error('User could not be updated: ' + err.message);
      console.error(err);
    },
  });

  return {updateUser, isUpdating};
};
