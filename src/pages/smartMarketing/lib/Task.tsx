import Node, {NodeOptions} from './Node';
import Line from './Line';
import allWidgets from '../widgets'

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

interface TaskOptions{
  name: string,
  version: number,
  list: NodeOptions[]
}

interface LinesObj {
  [index: string]: {
    pId: number
    cId: number
  }
}
/**
 * Task任务类
 * 1、构建和加载任务
 * 2、管理node节点和line连线
 */
export default class Task{
  rootId: number;
  name: string;
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

  constructor(data?: TaskOptions){
    console.log('Task: data', data);
    this.name = '默认名称';
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

    this.init(data);
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
  setName(name: string){
    this.name = name;
  }
  getNodeList(){
    return this.nodeList;
  }
  getLineList(){
    return this.lineList;
  }
  newNode(nodeInfo: NodeOptions){
    const res = this.checkoutWidgetMax(nodeInfo.widget)
    if (res.result) {
      console.log(`该节点存在数量不能大于${res.max}`)
      return
    }
    const node = new Node({ ...nodeInfo ,id: nodeInfo.id ||  this.getRootId()});
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
    for(var k in this.nodes[nodeId].childsNodeIds) {
      this.nodes[k].removeParentNodeId(nodeId);
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
    cNode.recordParentNodeId(mId);

    this.lineList.push(line);
  }
  // 删除节点，需要将改节点绑定的连线删除
  removeLineByNodeId(nodeId: number){
    const _tmpList = this.lineList.filter((line) => (nodeId !== line.pId) && (nodeId !== line.cId))
    this.lineList = _tmpList;
  }
  // 删除连线
  removeLine(lineId: number){
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
    _items.forEach((line) => {
      const pNode = this.nodes[line.pId];
      const cNode = this.nodes[line.cId];
      const lineOption = this.getLineOption(pNode.x, pNode.y, cNode.x, cNode.y);
      line.drawLinePath(lineOption);
    })
  }
  // 获取组件存在数量
  checkoutWidgetMax(widget: any){
    const options = allWidgets[widget.id].options;
    const _items = this.nodeList.filter((node) => node.widget.id === widget.id);
    return {
      result: options.max && (_items.length >= options.max),
      max: options.max 
    }
  }
  initLineList(liensObj: LinesObj){
    for(var i in liensObj) {
      const pId = liensObj[i].pId;
      const cId = liensObj[i].cId;
      if (this.nodes[pId] && this.nodes[cId]) {
        this.newLine(this.nodes[pId], this.nodes[cId]);
      }
    }
  }
  init(data?: TaskOptions){
    if (!data) return
    this.name = data.name;
    this.version = data.version;

    const liensObj: LinesObj = {};
    data.list.forEach((item: NodeOptions) => {
      // 更新根id
      this.rootId = Math.max(this.rootId, item.id);
      // 实例化节点
      this.newNode(item);

      // 记录连线列表
      item.parentIds && item.parentIds.forEach((id) => {
        const cId = item.id;
        const pId = id;

        liensObj[`$${pId}$${cId}`] = {
          pId,
          cId
        }
      })
      item.childsIds && item.childsIds.forEach((id) => {
        const pId = item.id;
        const cId = id;

        liensObj[`$${pId}$${cId}`] = {
          pId,
          cId
        }
      })
    })
    // 实例化连线
    this.initLineList(liensObj);
  }
  save(){
    return {
      version: this.version,
      name: this.name,
      list: this.nodeList.map((node) => node.save())
    }
  }
}
