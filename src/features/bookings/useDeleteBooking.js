import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteBooking as deleteBookingApi} from '../../services/apiBookings';
import toast from 'react-hot-toast';

const useDeleteBooking = () => {
  const invalidateQueries = useQueryClient();

  const {mutate: deleteBooking, isPending: isDeletingBooking} = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking has been deleted successfully!`);
      invalidateQueries.invalidateQueries(['bookings']);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while deleting the booking.'
      );
    },
  });

  return {deleteBooking, isDeletingBooking};
};

export default useDeleteBooking;
