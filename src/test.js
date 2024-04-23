
// export function updateNode(id, data) {
//   const node = nodes.get(id);

//   for (const [key, val] of Object.entries(data)) {
//     if (node[key] instanceof AudioParam) {
//       node[key].value = val;
//     } else {
//       node[key] = val;
//     }
//   }
// }

case 'osc': {
    const data = { frequency: 440, type: 'sine' };
    const position = { x: 0, y: 0 };

    createNode(id, type, data);
    set({ nodes: [...get().nodes, { id, type, data, position }] });

    break;
  }
