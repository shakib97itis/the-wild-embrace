import styled from 'styled-components';

import {useMoveBack} from '../../hooks/useMoveBack';
import {useNavigate} from 'react-router';
import useCheckout from '../check-in-out/useCheckout';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import useBooking from './useBooking';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useDeleteBooking from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const {isLoading, booking} = useBooking();
  const {checkout, isCheckingOut} = useCheckout();
  const {deleteBooking, isDeletingBooking} = useDeleteBooking();

  if (isLoading) return <Spinner />;

  const {status, id: bookingId} = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            onClick={() => {
              navigate(`/checkin/${bookingId}`);
            }}
          >
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger" disabled={isDeletingBooking}>
              Delete booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete-booking" title="Delete booking">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => {
                    navigate('/bookings');
                  },
                })
              }
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
