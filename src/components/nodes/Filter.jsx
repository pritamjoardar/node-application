import React, { useState } from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';
import { useCSVDataStore } from '../../store'

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
});

const Filter = ({ id, data })=> {
  const { setGain } = useStore(selector(id), shallow);
  const {jsonData} = useCSVDataStore();
  return (
    <>
      <div className='rounded-md bg-white border border-primary shadow-xl'>
      <div className='bg-primary text-white font-bold p-2'>Filter Data</div>
      <div className=" p-2 flex justify-center flex-col">
      {jsonData && jsonData.length > 0 ?
            <h1>Data Available</h1> :
            <h1>Data is Empty</h1>
          }
      <select className="nodrag"  >
      {jsonData && jsonData[0] && Object.keys(jsonData[0])?.map((i)=>(
              <option value={i}>{i}</option>
            ))}
          </select>
      </div>
    </div>
      <Handle className='w-2 h-2' type="source" position="bottom" />
      </>
  );
}

export default Filter