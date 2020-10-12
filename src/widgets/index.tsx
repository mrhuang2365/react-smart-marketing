import * as Cmpt1 from './Cmpt-1'
import * as Start from './Start'

// 记录节点对应组件
let allWidgets: {
  [index: string]: any
} = {};

function __untilWidget(widget: any){
  const {options} = widget;
  const {id} = options;

  allWidgets[id] = {
    options: options,
    component: widget.default,
  }

  return {id, name: options.name}
}

// 记录节点菜单
export const widgetList = [
  {
    name:'系统节点',
    childrens:[
      __untilWidget(Start),
    ]
  },
  {
    name:'组件一类',
    childrens:[
      __untilWidget(Cmpt1),
    ]
  },
]


console.log('allWidgets:', allWidgets)
export default allWidgets