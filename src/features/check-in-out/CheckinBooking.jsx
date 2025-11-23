import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {useMoveBack} from '../../hooks/useMoveBack';
import useBooking from '../bookings/useBooking';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import BookingDataBox from '../../features/bookings/BookingDataBox';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import useCheckin from './useCheckin';
import {formatCurrency} from '../../utils/helpers';
import useSettings from '../settings/useSettings';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [needsBreakfast, setNeedsBreakfast] = useState(false);

  const {checkin, isCheckingIn} = useCheckin();
  const {isLoading, booking} = useBooking();
  const {isPending: isSettingsLoading, settings} = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
    setNeedsBreakfast(booking?.hasBreakfast || false);
  }, [booking?.isPaid, booking?.hasBreakfast]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    // hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const breakfast = {
    pricePerGuest: settings.breakfastPrice || 0,
    totalPrice: (settings.breakfastPrice || 0) * numGuests * numNights,
  };

  function handleCheckin() {
    if (!confirmPaid) return;
    if (needsBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          totalPrice: totalPrice + breakfast.totalPrice,
          extrasPrice: breakfast.totalPrice,
        },
      });
    } else {
      checkin({bookingId, breakfast: {}});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!isPaid && (
        <Box>
          <Checkbox
            checked={needsBreakfast}
            id="needs-breakfast"
            disabled={false}
            onChange={() => {
              setNeedsBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
          >
            Add breakfast for{' '}
            <b>
              {numGuests} guest{numGuests > 1 ? 's' : ''} for {numNights} night
              {numNights > 1 ? 's' : ''} at{' '}
              {formatCurrency(breakfast.pricePerGuest)} each (
              {formatCurrency(breakfast.totalPrice)})
            </b>
          </Checkbox>
        </Box>
      )}

      {!isPaid && (
        <Box>
          <Checkbox
            checked={confirmPaid}
            id={'confirm-paid'}
            disabled={isCheckingIn}
            onChange={() => setConfirmPaid((prev) => !prev)}
          >
            I confirm that <b>{guests.fullName}</b> has paid the total amount of{' '}
            <b>
              {needsBreakfast
                ? `${formatCurrency(
                    totalPrice + breakfast.totalPrice
                  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                    breakfast.totalPrice
                  )})`
                : formatCurrency(totalPrice)}
            </b>
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
          variation="primary"
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
