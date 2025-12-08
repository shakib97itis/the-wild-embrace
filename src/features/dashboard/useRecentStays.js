import {sub} from 'date-fns';
import {useSearchParams} from 'react-router';
import {getStaysAfterDate} from '../../services/apiBookings';
import {useQuery} from '@tanstack/react-query';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const recentDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 7;

  const queryDate = sub(new Date(), {days: recentDays}).toISOString();

  const {
    data: recentStays,
    isPending: isRecentStaysLoading,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['recent-stays', `last-${recentDays}`],
  });

  if (error) {
    console.error(error);
    throw new Error('Recent stays could not get loaded');
  }
  return {recentStays, isRecentStaysLoading};
}
