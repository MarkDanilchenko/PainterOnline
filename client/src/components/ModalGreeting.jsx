import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../store/userReducer.js';

const ModalGreeting = (props) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = React.useState(true);
	const [inputUsername, setInputUsername] = React.useState('');
	const username = useSelector((state) => {
		return state.userReducer.username;
	});

	const connectHandler = () => {
		setShowModal(false);
		dispatch(setUsername(inputUsername));
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
				<Button variant="primary" onClick={() => connectHandler()}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { ModalGreeting };
