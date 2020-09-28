import Node from './Node';
import Line from './Line';

/**
 * Task任务类
 * 1、构建和加载任务
 * 2、管理node节点和line连线
 */
export default class Task{
  rootId: number;
  version: number;
  nodeList: Node[];
  lineList: Line[];
  nodes: {
    [index: string]: Node
  } = {};
  lines: {
    [index: string]: Line
  } = {};
  state: {
    selectId: number
  };
  

  constructor(data?: any){
    console.log('Task: data', data);
    this.rootId = 1;
    this.version = 1;
    this.nodeList = [];
    this.lineList = [];
    this.nodes = {};
    this.lines = {};

    this.state = {
      selectId: 0
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
  getLineList(){
    return this.lineList;
  }
  setNodePostion(id:number, x:number, y:number){
    if (!id || typeof(this.nodes[id]) === 'undefined') {
      return new Error('参数无效')
    }
    this.nodes[id].setPosition(x, y);
  }
  selectNode(id:number) {
    console.log('Task, selectNode ==> id:', id)
    this.state.selectId = id;
  }
}
