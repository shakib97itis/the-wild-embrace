import {useQuery} from '@tanstack/react-query';
import {getBooking} from '../../services/apiBookings';
import {useParams} from 'react-router';

const useBooking = () => {
  const {id: bookingId} = useParams();

  const {data, error, isLoading} = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(bookingId),
  });

  return {booking: data, error, isLoading};
};

export default useBooking;
