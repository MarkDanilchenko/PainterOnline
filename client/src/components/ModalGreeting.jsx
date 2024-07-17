import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setUsername } from '../store/userReducer.js';

const ModalGreeting = (props) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = React.useState(true);
	const [inputUsername, setInputUsername] = React.useState('');

	const connectHandler = () => {
		if (inputUsername) {
			dispatch(setUsername(inputUsername));
			setShowModal(false);
		} else {
			return;
		}
	};

	return (
		<Modal
			show={showModal}
			onHide={() => {
				setShowModal(false);
			}}
			backdrop="static"
			keyboard={false}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header>
				<Modal.Title>Welcome to Painter Online</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<Form.Label>
						Please, enter your <b>username</b> for futher usage:
					</Form.Label>
					<Form.Control
						type="text"
						placeholder="Username"
						autoFocus
						onChange={(event) => {
							setInputUsername(event.target.value);
						}}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => connectHandler()} disabled={!inputUsername}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { ModalGreeting };
