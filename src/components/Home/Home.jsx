import React from 'react';
import ReactFlow, { ReactFlowProvider, Background, Panel } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';
import Filter from '../nodes/Filter';
import Delay from '../nodes/Delay';
import Execute from '../nodes/Execute';
import Format from '../nodes/Format';
import Send from '../nodes/Send'
import { Link } from 'react-router-dom';
import 'reactflow/dist/style.css';

const nodeTypes = {
  filter: Filter,
  delay: Delay,
  out: Execute,
  format:Format,
  send:Send,

};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addFilter: () => store.createNode('filter'),
  addDelay: () => store.createNode('delay'),
  addFormat: () => store.createNode('format'),
  addSend: () => store.createNode('send'),
});

export default function App() {
  const store = useStore(selector, shallow);
  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onNodesDelete={store.onNodesDelete}
          onEdgesChange={store.onEdgesChange}
          onEdgesDelete={store.onEdgesDelete}
          onConnect={store.addEdge}
          fitView
        >
          <Panel className='space-x-4' position="top-right">
            <button className='px-2 py-1 rounded bg-white shadow' onClick={store.addFilter}>
              Add Filter
            </button>
            <button className='px-2 py-1 rounded bg-white shadow' onClick={store.addDelay}>
              Add Delay
            </button>
            <button className='px-2 py-1 rounded bg-white shadow' onClick={store.addFormat}>
              Add Format
            </button>
            <button className='px-2 py-1 rounded bg-white shadow' onClick={store.addSend}>
              Add Send
            </button>
            <Link to={'/upload'} className='px-2 py-1 rounded bg-white shadow'>Upload File</Link>
          </Panel>
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
