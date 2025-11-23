import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {updateBooking} from '../../services/apiBookings';
import {useNavigate} from 'react-router';

const useCheckin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {mutate: checkin, isPending: isCheckingIn} = useMutation({
    mutationFn: ({bookingId, breakfast}) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`${data.id} has been checked in successfully!`);
      queryClient.invalidateQueries(['booking, ', data.id]);
      navigate('/');
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while checking in the booking.'
      );
    },
  });
  return {checkin, isCheckingIn};
};

export default useCheckin;
