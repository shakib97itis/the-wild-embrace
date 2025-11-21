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
import {useNavigate} from 'react-router';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const {checkinBooking, isCheckingIn} = useCheckin();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const {isLoading, booking} = useBooking();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking?.isPaid]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    status,
    // totalPrice,
    // numGuests,
    // hasBreakfast,
    // numNights,
  } = booking;

  function handleCheckin() {
    if (status === 'checked-in') return;
    checkinBooking(bookingId, {
      onSuccess: () => {
        navigate('/');
      },
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          id={bookingId}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          I confirm that I have received payment for this booking from{' '}
          <b>{guests.fullName}</b>
        </Checkbox>
      </Box>

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
