import React from "react";
import { useDispatch } from "react-redux";
import { setLineWidth, setFillColor, setStrokeColor } from "../store/toolsReducer.js";
import { ModalNotice } from "./ModalNotice.jsx";

const SettingsBar = (props) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = React.useState(false);
	const [modalContent, setModalContent] = React.useState("");

	return (
		<>
			<ModalNotice showModal={showModal} modalContent={modalContent} setShowModal={setShowModal} />
			<div className="settingsBar">
				<div>
					<label htmlFor="lineWidth" className="form-label">
						Line Width
					</label>
					<input
						type="number"
						className="form-control form-control-sm"
						name="lineWidth"
						id="lineWidth"
						min="1"
						max="50"
						defaultValue="1"
						onChange={(event) => {
							try {
								dispatch(setLineWidth(event.target.value));
							} catch (error) {
								event.target.value = 1;
								setModalContent("Tool is not set. Please, choose a tool first and then set a line width.");
								setShowModal(true);
							}
						}}
					/>
				</div>
				<div>
					<label className="form-label" id="settingsBar__label_colorPicker-fill">
						Fill
					</label>
					<button
						className="settingsBar__button_colorPicker-fill"
						onClick={() => {
							document.getElementById("settingsBar__input_colorPicker-fill").click();
						}}
					></button>
					<input
						type="color"
						className="form-control form-control-color"
						name="settingsBar__input_colorPicker-fill"
						id="settingsBar__input_colorPicker-fill"
						defaultValue={"#000000"}
						style={{ display: "none" }}
						onChange={(event) => {
							try {
								dispatch(setFillColor(event.target.value));
							} catch (error) {
								event.target.value = "#000000";
								setModalContent("Tool is not set. Please, choose a tool first and then set a color.");
								setShowModal(true);
							}
						}}
					/>
				</div>
				<div>
					<label className="form-label" id="settingsBar__label_colorPicker-stroke">
						Stroke
					</label>
					<button
						className="settingsBar__button_colorPicker-stroke"
						onClick={() => {
							document.getElementById("settingsBar__input_colorPicker-stroke").click();
						}}
					></button>
					<input
						type="color"
						className="form-control form-control-color"
						name="settingsBar__input_colorPicker-stroke"
						id="settingsBar__input_colorPicker-stroke"
						defaultValue={"#000000"}
						style={{ display: "none" }}
						onChange={(event) => {
							try {
								dispatch(setStrokeColor(event.target.value));
							} catch (error) {
								event.target.value = "#000000";
								setModalContent("Tool is not set. Please, choose a tool first and then set a color.");
								setShowModal(true);
							}
						}}
					/>
				</div>
			</div>
		</>
	);
};

export { SettingsBar };
