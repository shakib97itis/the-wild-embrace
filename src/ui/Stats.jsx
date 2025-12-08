import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import Stat from '../features/dashboard/Stat';
import {formatCurrency} from '../utils/helpers';

const Stats = ({
  bookings = [],
  conformedStays = [],
  numDays = 1,
  cabinCount = 1,
}) => {
  const bookingCount = bookings.length;

  const sales = bookings.reduce(
    (total, booking) => total + (booking.totalPrice || 0),
    0
  );

  const checkIns = conformedStays.length;

  const totalNights = conformedStays.reduce(
    (total, stay) => total + (stay.numNights || 0),
    0
  );

  const occupancyRate = Math.round(
    (totalNights / (cabinCount * numDays)) * 100
  );

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        color="blue"
        value={bookingCount}
      />

      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
      />

      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check Ins"
        color="indigo"
        value={checkIns}
      />

      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        color="yellow"
        value={`${occupancyRate}%`}
      />
    </>
  );
};

export default Stats;
