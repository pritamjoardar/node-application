export function filter(type,node,jsonData){
    node.type = type;
    if(type){
        node.data = jsonData.map(item => item[type].toLowerCase());
      }
      return node;
}