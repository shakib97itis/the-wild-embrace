import {useQuery} from '@tanstack/react-query';
import {getBookings} from '../../services/apiBookings';
import {useSearchParams} from 'react-router';

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status')
    ? searchParams.get('status')
    : 'all';

  const filter =
    filterValue === 'all'
      ? null
      : {field: 'status', value: filterValue, operator: 'eq'};

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {field, direction};

  const {
    isPending: isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filterValue, sortByRaw],
    queryFn: () => getBookings({filter, sortBy}),
  });

  return {bookings, isLoading, error};
}
