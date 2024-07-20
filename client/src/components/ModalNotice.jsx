import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalNotice = (props) => {
	return (
		<Modal
			show={props.showModal}
			onHide={() => {
				props.setShowModal(false);
			}}
			backdrop="static"
			keyboard={false}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header>
				<Modal.Title id="modalNotice__header__title">
					<p>Notice!</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p style={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px' }}>{props.modalContent}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					onClick={() => {
						props.setShowModal(false);
						props.setModalResult(true);
					}}
				>
					OK
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						props.setShowModal(false);
						props.setModalResult(false);
					}}
				>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { ModalNotice };
