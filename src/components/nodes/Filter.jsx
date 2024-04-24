import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';
import { useCSVDataStore } from '../../store'

const selector = (id) => (store) => ({
  setType: (e) => store.updateNode(id, { type: e.target.value}),
});

const Filter = ({ id, data })=> {
  const { setType } = useStore(selector(id), shallow);
  const {jsonData} = useCSVDataStore();

  return (
    <>
      <div className='rounded-md bg-white border overflow-hidden border-primary shadow-xl'>
      <div className='bg-primary text-white font-bold p-2'>Filter Data</div>
      <div className=" p-2 flex justify-center flex-col">
      {jsonData && jsonData.length > 0 ?
            <h1>Data Available</h1> :
            <h1>Data is Empty</h1>
          }
      <select className="nodrag" value={data.type} onChange={setType} >
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