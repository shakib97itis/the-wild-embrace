import React, {useState} from 'react';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

const CreateCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal(true)} variation="primary">
        Show Cabin Form
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            onCloseModal={() => setIsOpenModal(false)}
            type="modal"
          />
        </Modal>
      )}
    </div>
  );
};

export default CreateCabin;
