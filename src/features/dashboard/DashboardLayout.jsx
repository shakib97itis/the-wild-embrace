import styled from 'styled-components';
import {useRecentBookings} from './useRecentBookings';
import {useRecentStays} from './useRecentStays';
import useCabins from '../cabins/useCabins';

import Stats from '../../ui/Stats';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodaysActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    recentBookings = [],
    numDays = 1,
    isRecentBookingsLoading,
  } = useRecentBookings();

  const {recentStays = [], isRecentStaysLoading} = useRecentStays();

  const {cabins = [], isLoading: isCabinLoading} = useCabins();

  const isLoading =
    isRecentBookingsLoading || isRecentStaysLoading || isCabinLoading;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        numDays={numDays}
        conformedStays={recentStays}
        cabinCount={cabins.length}
      />

      <TodaysActivity />

      <DurationChart recentStays={recentStays} />

      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
