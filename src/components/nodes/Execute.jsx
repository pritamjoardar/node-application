import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';
import Button from "../button/Button";

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function Out({ id, data }) {
  const { isRunning, toggleAudio } = useStore(selector, shallow);
  return (
    <>
      <Handle className='w-2 h-2' type="target" position="top" />
    <div className='rounded-md bg-white border border-primary shadow-xl'>
      <div className='bg-primary text-white font-bold p-2'>Execute</div>
      <div className=" py-8 px-5">
      <Button/>
      </div>
    </div>
    </>
  );
}
