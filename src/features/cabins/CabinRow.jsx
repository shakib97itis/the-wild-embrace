import styled from 'styled-components';
import {formatCurrency} from '../../utils/helpers';

import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeleteCabin';
import {HiPencil, HiSquare2Stack, HiTrash} from 'react-icons/hi2';
import useCreateCabin from './useCreateCabin';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({cabin}) => {
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {createCabin} = useCreateCabin();
  const {id, name, maxCapacity, regularPrice, discount, image, description} =
    cabin;
  const handleDuplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <div>&mdash;</div>
      )}
      <div style={{display: 'flex', gap: '1rem'}}>
        {/* <button onClick={} disabled={isCreating}></button> */}

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button
                onClick={handleDuplicateCabin}
                icon={<HiSquare2Stack size={20} />}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="cabin-edit">
                <Menus.Button onClick={() => {}} icon={<HiPencil size={20} />}>
                  Edit
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="cabin-delete">
                <Menus.Button onClick={() => {}} icon={<HiTrash size={20} />}>
                  Delete cabin
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="cabin-edit">
              <CreateCabinForm cabinToEdit={cabin} isEditMode={true} />
            </Modal.Window>

            <Modal.Window name="cabin-delete">
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
