import React from 'react';
import './Popup.css';

function Popup ({ onOpen }) {

  return (
    <div className={`popup__success ${onOpen ? "popup__success_active" : "" }`}>
      <div className="popup__container">
        <h2 className="popup__title">Ничего не найдено</h2>
      </div>
    </div>
  )
}

export default Popup
