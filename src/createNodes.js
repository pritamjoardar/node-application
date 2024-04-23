import axios from "axios";
const nodes = new Map();
const context = new AudioContext();
class Node {
  constructor(id, type, data) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.connections = new Set();
  }
  connect(node) {
    this.connections.add(node);
  }
}

context.suspend();
nodes.set('output', context.destination);

export function isRunning() {
  return context.state === 'running';
}

export function toggleButton() {
  return isRunning() ? context.suspend() : context.resume();
}

export function createNode(id, type, data) {
  switch (type) {
    
    case 'filter': {
      const node = new Node(id,type);
      node.data = JSON.parse(data.JSONDATA); 
      node.type = data.type; 
      if (data.type && node.data[data.type]) {
        node.data[data.type] = node.data[data.type].toLowerCase();
      }
      nodes.set(id, node);
      break;
    }

    case 'delay': {
      const node = new Node(id,type);
      node.data = data.delay;
      setTimeout(() => {
        nodes.set(id, node);
      },[data.delay]);
      break;
    }

    case 'format': {
      const node = new Node(id,type);
      node.data = data.JSONDATA;
      nodes.set(id, node);
      break;
    }

    case 'send': {
      const node = new Node(id,type);
      node.data = JSON.parse(data.JSONDATA);
      nodes.set(id, node);
      // Send a POST request to requestcatcher.com
      const sendRequest = async() =>{
      await  axios.post('https://sendnodetestingdata.requestcatcher.com/test', node.data)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      }
      sendRequest();
      break;
    }

  }
}

export function updateNode(id, data) {
  const node = nodes.get(id);

  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof Node) {
      node[key].value = val;
    } else {
      node[key] = val;
    }
  }
}

export function removeNode(id) {
  const node = nodes.get(id);
  node.disconnect();
  node.stop?.();
  nodes.delete(id);
}

export function connect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);
  source.connect(target);
}

export function disconnect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  source.disconnect(target);
}
