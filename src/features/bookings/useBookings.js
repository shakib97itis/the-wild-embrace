import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getBookings} from '../../services/apiBookings';
import {useSearchParams} from 'react-router';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get('status')
    ? searchParams.get('status')
    : 'all';

  const filter =
    filterValue === 'all'
      ? null
      : {field: 'status', value: filterValue, operator: 'eq'};

  const {
    isPending: isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filterValue],
    queryFn: () => getBookings({filter}),
    onSuccess: (data) =>
      queryClient.setQueryData(['bookings', filterValue], data),
  });

  return {bookings, isLoading, error};
}
