import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFillColor, setLineWidth, setStrokeColor } from '../store/toolsReducer.js';
import ModalNotice from './ModalNotice.jsx';

const SettingsBar = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');
  const activeTool = useSelector((state) => {
    return state.toolsReducer.tool;
  });

  return (
    <>
      <ModalNotice showModal={showModal} modalContent={modalContent} setShowModal={setShowModal} />
      <div className='settingsBar'>
        <div>
          <label htmlFor='lineWidth' className='form-label'>
            Line Width
          </label>
          <input
            type='number'
            className='form-control form-control-sm'
            name='lineWidth'
            id='lineWidth'
            min='1'
            max='50'
            defaultValue='1'
            onChange={(event) => {
              if (!activeTool) {
                setModalContent('Tool is not set. Please, choose a tool first and then set a line width.');
                setShowModal(true);
                event.target.value = 1;

                return;
              }
              if (event.target.value < 1) {
                event.target.value = 1;
                setModalContent('Line width must be greater than 0.');
                setShowModal(true);
              } else if (event.target.value > 50) {
                event.target.value = 50;
                setModalContent('Line width must be less than 50.');
                setShowModal(true);
              } else {
                dispatch(setLineWidth(event.target.value));
              }
            }}
          />
        </div>
        <div>
          <label className='form-label' id='settingsBar__label_colorPicker-fill'>
            Fill
          </label>
          <button
            className='settingsBar__button_colorPicker-fill'
            onClick={() => {
              document.getElementById('settingsBar__input_colorPicker-fill').click();
            }}></button>
          <input
            type='color'
            className='form-control form-control-color'
            name='settingsBar__input_colorPicker-fill'
            id='settingsBar__input_colorPicker-fill'
            defaultValue={'#000000'}
            style={{ display: 'none' }}
            onChange={(event) => {
              if (!activeTool) {
                setModalContent('Tool is not set. Please, choose a tool first and then set a color.');
                setShowModal(true);
                event.target.value = '#000000';

                return;
              }
              dispatch(setFillColor(event.target.value));
            }}
          />
        </div>
        <div>
          <label className='form-label' id='settingsBar__label_colorPicker-stroke'>
            Stroke
          </label>
          <button
            className='settingsBar__button_colorPicker-stroke'
            onClick={() => {
              document.getElementById('settingsBar__input_colorPicker-stroke').click();
            }}></button>
          <input
            type='color'
            className='form-control form-control-color'
            name='settingsBar__input_colorPicker-stroke'
            id='settingsBar__input_colorPicker-stroke'
            defaultValue={'#000000'}
            style={{ display: 'none' }}
            onChange={(event) => {
              if (!activeTool) {
                setModalContent('Tool is not set. Please, choose a tool first and then set a color.');
                setShowModal(true);
                event.target.value = '#000000';

                return;
              }
              dispatch(setStrokeColor(event.target.value));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SettingsBar;
