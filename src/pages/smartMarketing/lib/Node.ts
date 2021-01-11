export interface NodeOptions{
  id: number
  x: number
  y: number
  type?: string
  name?: string
  widget: any
  params?: any
  isSystem?: boolean
  parentIds?: number[]
  childsIds?: number[]
}

/**
 * Node节点类
 * 1、构建和加载Node
 * 2、记录节点位置，x和y(对应h5绝对定位left和top)
 * 3、记录应用的组件以及组件的参数
 * 4、记录与其他有事件流关系的节点id（父节点与子节点的id）
 */
export default class Node{
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  isSystem: boolean = false;
  widget: any;
  parentNodeIds: {
    [index: number]: true
  } = {};
  childsNodeIds: {
    [index: number]: true
  } = {};
  params: any;

  constructor(options: NodeOptions) {
    // console.log('Node， options:', options);
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.type = options.type || options.widget.id;
    this.name = options.name || options.widget.name;
    this.widget = options.widget;
    this.isSystem = !!(options.isSystem || options.widget.isSystem);
    this.params = options.params || options.widget.params || {};
  }

  getType(){
    return this.type;
  }
  setName(name: string){
    this.name = name;
  }
  setParams(params: any){
    this.params = params;
  }
  setPosition(x:number, y:number){
    this.x = x;
    this.y = y;
  }
  // 记录父节点id
  recordParentNodeId(id: number){
    this.parentNodeIds[id] = true;
  }
  // 记录子节点id
  recordChildsNodeId(id: number){
    this.childsNodeIds[id] = true;
  }
  // 删除子节点id
  removeChildNodeId(id: number){
    delete this.childsNodeIds[id];
  }
  // 删除父节点id
  removeParentNodeId(id: number){
    delete this.parentNodeIds[id];
  }
  getParentIdList(){
    let ids = [];
    for (var i in this.parentNodeIds) {
      ids.push(Number(i))
    }
    return ids;
  }
  getChilsIdList(){
    let ids = [];
    for (var i in this.childsNodeIds) {
      ids.push(Number(i))
    }
    return ids;
  }
  // 判断是否存在关系
  nodeIdIsExist(id:number){
    return this.parentNodeIds[id] || this.childsNodeIds[id]
  }

  save():NodeOptions{
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      type: this.type,
      name: this.name,
      widget: this.widget,
      params: this.params,
      isSystem: this.isSystem,
      parentIds: this.getParentIdList(),
      childsIds: this.getChilsIdList(),
    }
  }
 }