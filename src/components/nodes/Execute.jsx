import React from 'react';
import { Handle } from 'reactflow';
import Button from "../button/Button";

export default function Out({ id, data }) {

  return (
    <>
      <Handle className='w-2 h-2' type="target" position="top" />
    <div className='rounded-md bg-white border overflow-hidden border-primary shadow-xl'>
      <div className='bg-primary text-white font-bold p-2'>Execute</div>
      <div className=" py-8 px-5">
      <Button/>
      </div>
    </div>
    </>
  );
}
