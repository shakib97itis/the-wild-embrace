import styled from 'styled-components';
import {useRecentBookings} from './useRecentBookings';
import {useRecentStays} from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {recentBookings, isRecentBookingsLoading} = useRecentBookings();
  const {recentStays, isRecentStaysLoading} = useRecentStays();

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart for stay duration</div>
      <div>Chart for sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
