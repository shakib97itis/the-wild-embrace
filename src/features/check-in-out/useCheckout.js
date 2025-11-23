import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {updateBooking} from '../../services/apiBookings';

const useCheckout = () => {
  const queryClient = useQueryClient();
  const {mutate: checkout, isPending: isCheckingOut} = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`${data.id} has been checked out successfully!`);
      queryClient.invalidateQueries(['booking, ', data.id]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while checking out the booking.'
      );
    },
  });
  return {checkout, isCheckingOut};
};

export default useCheckout;
