import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {updateBooking} from '../../services/apiBookings';

const useCheckin = () => {
  const queryClient = useQueryClient();
  const {mutate: checkinBooking, isPending: isCheckingIn} = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {status: 'checked-in', isPaid: true}),
    onSuccess: (data) => {
      toast.success(`${data.id} has been checked in successfully!`);
      queryClient.invalidateQueries(['booking, ', data.id]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while checking in the booking.'
      );
    },
  });
  return {checkinBooking, isCheckingIn};
};

export default useCheckin;
