import Node from './Node';

/**
 * Task任务类
 * 1、构建和加载任务
 * 2、管理node节点和line连线
 */
export default class Task{
  rootId: number;
  version: number;
  nodeList: Node[];
  nodes: {
    [index: string]: Node
  } = {};
  state: {
    selectId: number | null
  };
  

  constructor(data?: any){
    console.log('Task: data', data);
    this.rootId = 1;
    this.version = 1;
    this.nodeList = [];
    this.nodes = {};

    this.state = {
      selectId: null
    };
    window.$$task = this;
  }
  newNode(x:number, y: number, widget: any){
    const node = new Node(this.getRootId(), {x, y, widget});
    this.nodeList.push(node);
    this.nodes[node.id] = node;
  }
  getRootId(){
    return ++this.rootId
  }
  getNodeList(){
    return this.nodeList;
  }
  setNodePostion(id:number, x:number, y:number){
    if (!id || typeof(this.nodes[id]) === 'undefined') {
      return new Error('参数无效')
    }
    this.nodes[id].setPosition(x, y);
  }
  selectNode(id:number) {
    this.state.selectId = id;
  }
}
