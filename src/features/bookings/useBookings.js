import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getBookings} from '../../services/apiBookings';
import {useSearchParams} from 'react-router';
import {PAGE_SIZE} from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filtering
  const filterValue = searchParams.get('status')
    ? searchParams.get('status')
    : 'all';
  const filter =
    filterValue === 'all'
      ? null
      : {field: 'status', value: filterValue, operator: 'eq'};

  // Sorting
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {field, direction};

  // Pagination
  const currentPage = Number(searchParams.get('page')) || 1;

  const {
    isPending: isLoading,
    data: {data: bookings, count} = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filterValue, sortByRaw, currentPage],
    queryFn: () => getBookings({filter, sortBy, page: currentPage}),
  });

  // Prefetch next page
  const totalPages = Math.ceil(count / PAGE_SIZE);

  if (currentPage < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterValue, sortByRaw, currentPage + 1],
      queryFn: () => getBookings({filter, sortBy, page: currentPage + 1}),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterValue, sortByRaw, currentPage - 1],
      queryFn: () => getBookings({filter, sortBy, page: currentPage - 1}),
    });
  }

  return {bookings, isLoading, error, count};
}
