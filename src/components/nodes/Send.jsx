import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';
import { BsFillSendFill } from "react-icons/bs";

const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

export default function Send({ id, data }) {
  const { setFrequency, setType } = useStore(selector(id), shallow);

  return (
    <>
    <Handle className='w-2 h-2' type="target" position="top" />
  <div className='rounded-md bg-white border border-primary shadow-xl'>
    <div className='bg-primary text-white font-bold p-2'>Send Post Request</div>
    <div className=" p-2 flex justify-center gap-3 items-center">
    <BsFillSendFill />
    </div>
  </div>
  <Handle className='w-2 h-2' type="source" position="bottom" />

  </>
  );
}
