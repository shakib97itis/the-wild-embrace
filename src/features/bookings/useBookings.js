import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getBookings} from '../../services/apiBookings';

export function useBookings() {
  const queryClient = useQueryClient();
  const {
    isPending: isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
    onSuccess: (data) => queryClient.setQueryData(['bookings'], data),
  });

  return {bookings, isLoading, error};
}
