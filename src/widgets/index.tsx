import * as Cmpt1 from './Cmpt-1'

let index = 0;

// 记录节点对应组件
let allWidgets: {
  [index: string]: object
} = {};

function __untilWidget(widget: any){
  const {options} = widget;

  const id = `cmpt_${++index}`;
  const name = `组件${index}`;
  const _options = {
    ...options, id, name
  }

  allWidgets[id] = {
    options: _options,
    component: widget.default,
  }

  return {id, name}
}

// 记录节点菜单
export const widgetList = [
  {
    name:'组件分类一',
    childrens:[
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
    ]
  },
  {
    name:'组件分类二',
    childrens:[
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
    ]
  },
]


console.log('allWidgets:', allWidgets)
export default allWidgets