import Node from './Node';
import Line from './Line';

export const dragEventMode = {
  add: 'add',
  move: 'move',
  line: 'line',
}
export declare interface GuideLinePath {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}
export declare interface State {
  selectId: number,
  guideLinePath: GuideLinePath
}

export const gloablTaskConfig = {
  node:{
    width: 60,
    height: 60,
  }
}

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
  state: State

  constructor(data?: any){
    console.log('Task: data', data);
    this.rootId = 1;
    this.version = 1;
    this.nodeList = [];
    this.lineList = [];
    this.nodes = {};
    this.lines = {};
    

    this.state = {
      selectId: 0,
      guideLinePath:{x1:0,x2:0,y1:0,y2:0},
    };
    window.$$task = this;
  }
  setState< K extends keyof State >(key: K, value: State[K]) {
    this.state[key] = value
  }
  getState< K extends keyof State >(key: K) {
    return this.state[key]
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
  newNode(x:number, y: number, widget: any){
    const node = new Node(this.getRootId(), {x, y, widget});
    this.nodeList.push(node);
    this.nodes[node.id] = node;
  }
  // 删除节点
  removeNode(nodeId: number){
    const index = this.nodeList.findIndex((item) => item.id === nodeId);

    if (index === -1 ) return
    
    this.nodeList.splice(index, 1);

    this.removeNodeRecordIds(nodeId);

    this.removeLineByNodeId(nodeId);
    
    delete this.nodes[nodeId]
  }
  // 移除记录的节点id
  removeNodeRecordIds(nodeId: number){
    for(var i in this.nodes[nodeId].parentNodeIds) {
      this.nodes[i].removeChildNodeId(nodeId);
    }
    for(var i in this.nodes[nodeId].childsNodeIds) {
      this.nodes[i].removeParentNodeId(nodeId);
    }
  }
  setNodePostion(id:number, x:number, y:number){
    if (!id || typeof(this.nodes[id]) === 'undefined') {
      return new Error('参数无效')
    }
    this.nodes[id].setPosition(x, y);
    this.refreshLinePath(id);
  }
  selectNode(id:number) {
    console.log('Task, seleccNode ==> id:', id)
    this.state.selectId = id;
  }

  getLineOption(x1: number,y1:number,x2:number,y2:number){
    const w = gloablTaskConfig.node.width;
    const h = gloablTaskConfig.node.height;
    let option={
      x1:x1,
      x2:x2,
      y1:y1,
      y2:y2,
      w,
      h,
    }
    return option;
  }

  // 添加连线
  newLine(pNode: Node, cNode: Node){
    const mId = pNode.id;
    const tId = cNode.id;
    if (mId === tId) return

    // 查找是否存在连线
    if (this.lineIsExist(pNode, cNode)) {
      return
    }
    // 添加line实例
    const lineOption = this.getLineOption(pNode.x, pNode.y, cNode.x,cNode.y);
    const line = new Line(lineOption, mId, tId);

    // 给节点添加纪录
    pNode.recordChildsNodeId(tId);
    cNode.recordChildsNodeId(mId);

    this.lineList.push(line);
  }
  // 删除节点，需要将改节点绑定的连线删除
  removeLineByNodeId(nodeId: number){
    const _tmpList = this.lineList.filter((line) => (nodeId !== line.pId) && (nodeId !== line.cId))
    this.lineList = _tmpList;
  }
  // 删除连线
  removeLineByLineId(lineId: number){
    const index = this.lineList.findIndex((item) => item.id === lineId);
    const line = this.lineList[index];
    if (index >= 0){
      this.lineList.splice(index, 1);
      // 删除两节点之间的流对应记录
      this.nodes[line.pId].recordChildsNodeId(line.cId);
      this.nodes[line.cId].removeParentNodeId(line.pId);
    }
  }
  // 获取是否在连线
  lineIsExist(pNode: Node, cNode: Node){
    const pId = pNode.id;
    const cId = cNode.id;
    if (pId === cId) return true
     // 查找是否存在连线
     return pNode.nodeIdIsExist(pId) || cNode.nodeIdIsExist(pId);
  }
   // 节点变更，刷新与该节点相关的连线
   refreshLinePath(nodeId: number) {
    const _items = this.lineList.filter((line) => (nodeId === line.pId) || (nodeId === line.cId))
    _items.map((line) => {
      const pNode = this.nodes[line.pId];
      const cNode = this.nodes[line.cId];
      const lineOption = this.getLineOption(pNode.x, pNode.y, cNode.x, cNode.y);
      line.drawLinePath(lineOption);
    })
  }
}
