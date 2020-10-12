/**
 * Node节点类
 * 1、构建和加载Node
 * 2、记录节点位置，x和y(对应h5绝对定位left和top)
 * 3、记录应用的组件以及组件的参数
 * 4、记录与其他有事件流关系的节点id（父节点与子节点的id）
 */
interface INodeOptions {
  x: number;
  y: number;
  widget: any;
}

export default class Node{
  id: number;
  name: string;
  x: number;
  y: number;
  isSystem: boolean = false;
  widget: any;
  options: INodeOptions;
  parentNodeIds: {
    [index: number]: true
  } = {};
  childsNodeIds: {
    [index: number]: true
  } = {};
  params: any;

  constructor(id: number, options: INodeOptions) {
    console.log('Node， options:', options);

    this.id = id;
    this.x = options.x;
    this.y = options.y;
    this.options = options;
    this.name = options.widget.name;
    this.widget = options.widget;
    this.isSystem = !!options.widget.isSystem;
    this.params = options.widget.params || {};
  }

  getType(){
    return this.widget.id;
  }
  setName(name: string){
    this.name = name;
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
  // 判断是否存在关系
  nodeIdIsExist(id:number){
    return this.parentNodeIds[id] || this.childsNodeIds[id]
  }
 }