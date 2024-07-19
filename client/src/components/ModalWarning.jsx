import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalWarning = (props) => {
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
				<Modal.Title id="modalWarning__header__title">
					<p>Warning!</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p style={{ textAlign: 'center' }}>
					Tool is not set.
					<br /> <br /> Please, choose a tool first to set a color or a line width.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					onClick={() => {
						props.setShowModal(false);
					}}
					onKeyUp={(e) => {
						if (e.key === 'Enter') {
							props.setShowModal(false);
						}
					}}
					disabled={false}
				>
					OK
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { ModalWarning };
