import React from 'react'
import "./button.css"
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';

const selector = (store) => ({

  isRunning: store.isRunning,
  toggleButton: store.toggleButton,
});
const Button = () => {
  const { isRunning, toggleButton} = useStore(selector, shallow);

  return (
    <>
   <div className="toggle-container">
  <input className="toggle-input" type="checkbox" onClick={toggleButton}/>
  <div className="toggle-handle-wrapper">
    <div className="toggle-handle">
      <div className="toggle-handle-knob"></div>
      <div className="toggle-handle-bar-wrapper">
        <div className="toggle-handle-bar"></div>
      </div>
    </div>
  </div>
  <div className="toggle-base">
    <div className="toggle-base-inside"></div>
  </div>
</div>
</>

  )
}

export default Button
