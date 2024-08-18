import React from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { setUsername } from '../store/connectionReducer.js';
import Logo from '../assets/IMG/logos/PO_logo.png';

const ModalGreeting = (props) => {
  const dispatch = useDispatch();
  const [inputUsername, setInputUsername] = React.useState('');

  const connectHandler = () => {
    if (inputUsername) {
      dispatch(setUsername(inputUsername));
      props.setShowModalGreeting(false);
    }

    return;
  };

  return (
    <Modal
      show={props.showModalGreeting}
      onHide={() => {
        props.setShowModalGreeting(false);
      }}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header>
        <Modal.Title id='modalGreeting__header__title'>
          <p>Painter Online</p>
          <Image
            src={Logo}
            rounded
            alt='Painter Online logo'
            title='Painter Online logo'
            style={{ width: '40px', height: '40px' }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>
            Please, enter your <b>username</b>:
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Username'
            autoFocus
            onChange={(event) => {
              setInputUsername(event.target.value);
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => connectHandler()} disabled={!inputUsername}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalGreeting;
