import {sub} from 'date-fns';
import {useSearchParams} from 'react-router';
import {getBookingsAfterDate} from '../../services/apiBookings';
import {useQuery} from '@tanstack/react-query';
export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const recentDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 7;
  const queryDate = sub(new Date(), {days: recentDays}).toISOString();
  const {
    data: recentBookings,
    isPending: isBookingsLoading,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['recent-bookings', `last-${recentDays}`],
  });

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return {recentBookings, isBookingsLoading, numDays: recentDays};
}
