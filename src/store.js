import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import {
  checkIsRunning,
  toggleButton,
  createNode,
  updateNode,
  removeNode,
  connect,
  excute,
  // disconnect,
} from './createNodes';
export const useCSVDataStore = create(
  persist(
    (set, get) => ({
      jsonData: [],
      setJSONData: (jsonData) => set({ jsonData: jsonData }),
    }),
    {
      name: 'json-storage', // name of the item in the storage (must be unique)
    },
  ),
)

export const useTypeStore = create(
  persist(
    (set, get) => ({
      type: "",
      setType: (type) => set({ type: type }),
    }),
    {
      name: 'type-storage', // name of the item in the storage (must be unique)
    },
  ),
)

export const useStore = create((set, get) => ({
  nodes: [{ id: 'output', type: 'out', position: { x: 0, y: 0 } }],
  edges: [],
  isRunning: checkIsRunning(),

  toggleButton() {
    toggleButton().then((isRunning) => {
      set({ isRunning: checkIsRunning() });
      if(isRunning) {
        excute();
      }
    });
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  createNode(type, x, y) {
    const id = nanoid();
    const jsonData = localStorage.getItem("json-storage");
    switch (type) {

      case 'filter': {
        try {
          const data = { JSONDATA: jsonData, type: "" };
          const position = { x: 0, y: 0 };
          createNode(id, type, data);
          set({ nodes: [...get().nodes, { id, type, data, position }] });
        } catch (error) {
          console.error("Error parsing JSON data:", error);
        }
        break;
      }

      case 'delay': {
        const data = { delay: 5000 };
        const position = { x: 0, y: 0 };

        createNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }

      case 'format': {
        const data = { gain: 0.5 };
        const position = { x: 0, y: 0 };

        createNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }

      case 'send': {
        const data = { JSONDATA: jsonData };
        const position = { x: 0, y: 0 };

        createNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
    }
  },

  updateNode(id, data) {
    updateNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: Object.assign(node.data, data) } : node
      ),
    });
  },

  onNodesDelete(deleted) {
    for (const { id } of deleted) {
      removeNode(id);
    }
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    connect(edge.source, edge.target);
    set({ edges: [edge, ...get().edges] });
  },

  // onEdgesDelete(deleted) {
  //   for ({ source, target } of deleted) {
  //     disconnect(source, target);
  //   }
  // },
}));
