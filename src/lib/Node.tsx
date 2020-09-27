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
    widget: any;

   constructor(id: number, options: INodeOptions) {
     console.log('Node， options:', options);

     this.id = id;
     this.x = options.x;
     this.y = options.y;
     this.name = options.widget.name;
     this.widget = options.widget;
   }

   setPosition(x:number, y:number){
     this.x = x;
     this.y = y;
   }
 }